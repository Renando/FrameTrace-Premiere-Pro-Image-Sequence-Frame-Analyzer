let csInterface = new CSInterface();
let fs = null;
let path = null;
let os = null;

try {
    if (typeof require !== 'undefined') {
        fs = require('fs');
        path = require('path');
        os = require('os');
    }
} catch (e) {
    console.error("Node modules failed to load: ", e);
}

let globalShotList = [];
let currentBlenderOutput = "";

document.addEventListener('DOMContentLoaded', () => {

    const btnAnalyze = document.getElementById('btn-analyze');
    const btnAnalyzeAll = document.getElementById('btn-analyze-all');
    const btnClearShots = document.getElementById('btn-clear-shots');
    const btnExportCSV = document.getElementById('btn-export-csv');
    const btnCopyBlender = document.getElementById('btn-copy-blender');

    const statusDot = document.getElementById('status-dot');

    const detailsView = document.getElementById('details-view');
    const renderPanel = document.getElementById('render-panel');
    const inspectorPanel = document.getElementById('inspector-panel');
    const missingPanel = document.getElementById('missing-panel');
    
    const viewerStart = document.getElementById('viewer-start');
    const viewerEnd = document.getElementById('viewer-end');
    const valFps = document.getElementById('val-fps');
    const valPadding = document.getElementById('val-padding');
    const valOffset = document.getElementById('val-offset');
    const valExt = document.getElementById('val-ext');
    
    const missingContainer = document.getElementById('missing-container');
    const shotTbody = document.getElementById('shot-tbody');

    const heatmapPanel = document.getElementById('heatmap-panel');
    const btnHeatmapAnalyze = document.getElementById('btn-heatmap-analyze');
    const btnHeatmapToggle = document.getElementById('btn-heatmap-toggle');
    const heatmapContainer = document.getElementById('heatmap-container');

    const refreshPanel = document.getElementById('refresh-panel');
    const btnRefreshRender = document.getElementById('btn-refresh-render');
    const valRenderTime = document.getElementById('val-render-time');
    const valRenderTotal = document.getElementById('val-render-total');
    const valRenderAdded = document.getElementById('val-render-added');
    const refreshStatus = document.getElementById('refresh-status');

    const notesPanel = document.getElementById('notes-panel');
    const btnSaveNote = document.getElementById('btn-save-note');
    const btnDeleteNote = document.getElementById('btn-delete-note');
    const notesListContainer = document.getElementById('notes-list-container');

    const mainTabs = document.getElementById('main-tabs');
    const navTabs = document.querySelectorAll('.nav-tab');
    const viewPanels = document.querySelectorAll('.view-panel');
    const shotManagerPanel = document.getElementById('shot-manager-panel');

    let currentActiveClipInfo = null;
    let lastDetectedFramesCount = 0;
    
    let currentNotesPath = null;
    let currentNotesData = {};
    let activeShotKey = null;

    let showHeatmapNums = false;

    // Load Notes
    function loadNotes() {
        if (!fs || !path) return;
        csInterface.evalScript('$._ext.getProjectInfo()', (res) => {
            try {
                const data = JSON.parse(res);
                if (data.path && data.path.length > 0) {
                    currentNotesPath = path.join(path.dirname(data.path), "notes.json");
                    if (fs.existsSync(currentNotesPath)) {
                        currentNotesData = JSON.parse(fs.readFileSync(currentNotesPath, 'utf8'));
                    }
                }
            } catch(e) {}
        });
    }
    loadNotes();

    function saveNotes() {
        if (currentNotesPath && fs) {
            fs.writeFileSync(currentNotesPath, JSON.stringify(currentNotesData, null, 2), 'utf8');
        }
    }

    function setStatus(type = "normal") {
        statusDot.className = 'status-dot';
        if (type !== 'normal') statusDot.classList.add(type);
    }

    function parseFileName(fileName) {
        const match = fileName.match(/^(.*?)(\d+)(\.[a-zA-Z0-9]+)$/i);
        if (match) {
            return {
                prefix: match[1],
                numString: match[2],
                baseNumber: parseInt(match[2], 10),
                padding: match[2].length,
                extension: match[3]
            };
        }
        return null;
    }

    function getSequenceBounds(mediaPathStr, parsed) {
        if (!fs || !path) return null;
        try {
            const dir = path.dirname(mediaPathStr);
            if (!fs.existsSync(dir)) return null;
            const files = fs.readdirSync(dir);
            let minNum = Infinity;
            let maxNum = -Infinity;
            let count = 0;
            let maxMtime = 0;
            files.forEach(f => {
                if (f.startsWith(parsed.prefix) && f.toLowerCase().endsWith(parsed.extension.toLowerCase())) {
                    const p = parseFileName(f);
                    if (p && p.padding === parsed.padding) {
                        minNum = Math.min(minNum, p.baseNumber);
                        maxNum = Math.max(maxNum, p.baseNumber);
                        count++;
                        const stat = fs.statSync(path.join(dir, f));
                        if(stat.mtimeMs > maxMtime) maxMtime = stat.mtimeMs;
                    }
                }
            });
            if (count === 0) return null;
            return { min: minNum, max: maxNum, count: count, lastMod: new Date(maxMtime).toLocaleString() };
        } catch (e) {
            return null;
        }
    }

    function checkMissingSequence(mediaPathStr, parsed, calcStart, calcEnd, clipInfo) {
        if (!fs || !path) return { error: 'Node.js filesystem not available.' };
        
        try {
            const dir = path.dirname(mediaPathStr);
            if (!fs.existsSync(dir)) return { error: 'Directory not found.' };

            const files = fs.readdirSync(dir);
            const sequenceNumbers = new Set();
            
            files.forEach(f => {
                if (f.startsWith(parsed.prefix) && f.toLowerCase().endsWith(parsed.extension.toLowerCase())) {
                    const p = parseFileName(f);
                    if (p && p.padding === parsed.padding) {
                        sequenceNumbers.add(p.baseNumber);
                    }
                }
            });

            
            let missingList = [];
            for (let f = calcStart; f <= calcEnd; f++) {
                if (!sequenceNumbers.has(f)) {
                    missingList.push(f);
                }
            }

            return { missing: missingList };
        } catch (e) {
            return { error: `FS Error: ${e.message}` };
        }
    }

    function performAnalysis(analyzeAllStr) {
        setStatus("active");
        csInterface.evalScript(`$._ext.analyzeClips("${analyzeAllStr}")`, (res) => {
            try {
                const data = JSON.parse(res);
                if (data.error) {
                    setStatus("error");
                    alert(data.error);
                    return;
                }
                
                if (data.clips && data.clips.length > 0) {
                    processClips(data.clips, data.fps);
                    setStatus("normal");
                }
            } catch (err) {
                setStatus("error");
                console.error("JSON parse error:", err);
                alert("Extension Error:\n" + err.message + "\n\nPayload:\n" + res);
            }
        });
    }

    btnAnalyze.addEventListener('click', () => performAnalysis("false"));
    btnAnalyzeAll.addEventListener('click', () => performAnalysis("true"));

    function processClips(clips, fps) {
        detailsView.style.display = 'flex';
        missingPanel.style.display = 'block';
        
        

        let firstValidClip = true;

        clips.forEach(clip => {
            let actualFileName = clip.name;
            if (clip.mediaPath) {
                actualFileName = clip.mediaPath.replace(/\\/g, '/').split('/').pop();
            }

            const parsed = parseFileName(actualFileName);
            if (!parsed) {
                addShotToTable(clip.name, "ERR", "Invalid format: " + actualFileName);
                return;
            }

            const origStart = parsed.baseNumber;
            const timelineOffset = clip.inPointFrames;
            const calcStart = origStart + timelineOffset;
            const calcEnd = calcStart + clip.durationFrames - 1;

            globalShotList.push({
                name: clip.name.split('.')[0],
                start: calcStart,
                end: calcEnd
            });

            if (firstValidClip) {
                firstValidClip = false;
                currentActiveClipInfo = clip;
                
                
                viewerStart.innerText = String(calcStart).padStart(parsed.padding, '0');
                viewerEnd.innerText = String(calcEnd).padStart(parsed.padding, '0');
                currentBlenderOutput = `Start Frame: ${calcStart}\nEnd Frame: ${calcEnd}`;

                
                valFps.innerText = `${clip.clipFps || fps} fps`;
                valPadding.innerText = `${parsed.padding} digits`;
                valOffset.innerText = `${timelineOffset} frames`;
                valExt.innerText = parsed.extension;

                
                const missingData = checkMissingSequence(clip.mediaPath, parsed, calcStart, calcEnd, clip);
                renderMissingPanel(missingData, clip, calcStart);
            }
        });

        renderShotTable();

        if (!firstValidClip) {
            renderNotesList();

            
            mainTabs.style.display = 'flex';
            const activeTab = document.querySelector('.nav-tab.active');
            if (activeTab) activeTab.click();
            
            
            if (currentActiveClipInfo) {
                const parsed = parseFileName(currentActiveClipInfo.mediaPath.replace(/\\/g, '/').split('/').pop());
                const bounds = getSequenceBounds(currentActiveClipInfo.mediaPath, parsed);
                if (bounds) {
                    valRenderTime.innerText = bounds.lastMod;
                    valRenderTotal.innerText = bounds.count;
                    valRenderAdded.innerText = "0";
                    lastDetectedFramesCount = bounds.count;
                    refreshStatus.innerHTML = '';
                }
            }

            // Auto Trigger Heatmap
            setTimeout(() => btnHeatmapAnalyze.click(), 300);
        }
    }

    function renderNotesList() {
        notesListContainer.innerHTML = '';
        globalShotList.forEach(shot => {
            const key = `${shot.name}_${shot.start}_${shot.end}`;
            
            const wrap = document.createElement('div');
            wrap.className = 'note-block';
            wrap.style.marginBottom = '12px';
            
            const hdr = document.createElement('div');
            hdr.className = 'note-target';
            hdr.innerText = key;
            
            const ta = document.createElement('textarea');
            ta.className = 'glass-textarea';
            ta.rows = 2;
            ta.placeholder = "Notes for " + shot.name + " (" + shot.start + " - " + shot.end + ")";
            ta.value = currentNotesData[key] || "";
            
            ta.addEventListener('input', () => {
                currentNotesData[key] = ta.value;
            });
            
            wrap.appendChild(hdr);
            wrap.appendChild(ta);
            notesListContainer.appendChild(wrap);
        });
    }

    function renderMissingPanel(missingData, clip, calcStart) {
        missingContainer.innerHTML = '';

        if (missingData.error) {
             missingContainer.innerHTML = `<div class="status-box error">${missingData.error}</div>`;
             return;
        }

        if (missingData.missing.length === 0) {
             missingContainer.innerHTML = `<div class="status-box valid">All frames present.</div>`;
             return;
        }

        const btnList = document.createElement('div');
        btnList.className = 'missing-list';

        missingData.missing.forEach(frameNum => {
            const item = document.createElement('div');
            item.className = 'missing-item';
            
            const numSpan = document.createElement('span');
            numSpan.className = 'frame-num';
            numSpan.innerText = `Frame: ${frameNum}`;

            const jmpBtn = document.createElement('button');
            jmpBtn.innerText = 'Jump to Frame';
            jmpBtn.onclick = () => {
                // Calculate position relative to timeline start
                const offsetFrames = frameNum - calcStart; 
                // ticksPerFrame 
                const offsetTicks = offsetFrames * clip.ticksPerFrame;
                const targetTicks = parseFloat(clip.startTicks) + offsetTicks;
                csInterface.evalScript(`$._ext.jumpToTime("${targetTicks}")`);
            };

            item.appendChild(numSpan);
            item.appendChild(jmpBtn);
            btnList.appendChild(item);
        });

        missingContainer.appendChild(btnList);
    }

    function renderShotTable() {
        shotTbody.innerHTML = '';
        if (globalShotList.length === 0) {
            shotTbody.innerHTML = '<tr><td colspan="4"><div class="empty-state">No shots generated.</div></td></tr>';
            return;
        }
        globalShotList.forEach((shot, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                   <span class="shot-name-display" style="cursor:pointer; display:inline-block; border-bottom: 1px dotted var(--text-dark);" title="Click to Edit">${shot.name}</span>
                   <input type="text" class="shot-name-input" value="${shot.name}" style="display:none; width: 80px; background: rgba(0,0,0,0.3); color: var(--accent-cyan); border: 1px solid var(--border-color); font-size: 10px; padding: 2px 4px; border-radius: 2px; outline:none;">
                </td>
                <td class="mono">${shot.start}</td>
                <td class="mono">${shot.end}</td>
                <td style="text-align: right; min-width: 30px;">
                   <button class="btn-icon btn-small del-shot" title="Delete Shot" style="display:inline-block;">
                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" style="opacity: 0.8;"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                   </button>
                </td>
            `;

            const btnDel = tr.querySelector('.del-shot');
            const inputName = tr.querySelector('.shot-name-input');
            const dispName = tr.querySelector('.shot-name-display');

            dispName.addEventListener('click', () => {
                 dispName.style.display = 'none';
                 inputName.style.display = 'inline-block';
                 inputName.focus();
            });

            const saveName = () => {
                let newName = inputName.value.trim();
                if (newName === '') newName = shot.name;
                const oldKey = `${shot.name}_${shot.start}_${shot.end}`;
                const newKey = `${newName}_${shot.start}_${shot.end}`;
                
                if (newName !== shot.name) {
                    if (currentNotesData[oldKey] !== undefined) {
                         currentNotesData[newKey] = currentNotesData[oldKey];
                         delete currentNotesData[oldKey];
                         saveNotes();
                    }
                    shot.name = newName;
                    renderShotTable();
                    renderNotesList();
                } else {
                    dispName.style.display = 'inline-block';
                    inputName.style.display = 'none';
                }
            };

            inputName.addEventListener('blur', saveName);
            inputName.addEventListener('keydown', (e) => {
                 if (e.key === 'Enter') saveName();
            });

            btnDel.addEventListener('click', () => {
                 if(confirm(`Delete shot ${shot.name}?`)) {
                     const k = `${shot.name}_${shot.start}_${shot.end}`;
                     if(currentNotesData[k] !== undefined) {
                         delete currentNotesData[k];
                         saveNotes();
                     }
                     globalShotList.splice(index, 1);
                     renderShotTable();
                     renderNotesList();
                 }
            });

            shotTbody.appendChild(tr);
        });
    }

    btnCopyBlender.addEventListener('click', () => {
        if (!currentBlenderOutput) return;
        navigator.clipboard.writeText(currentBlenderOutput).then(() => {
            const orig = btnCopyBlender.innerText;
            btnCopyBlender.innerText = "Copied!";
            setTimeout(() => btnCopyBlender.innerText = orig, 1500);
        });
    });

    btnClearShots.addEventListener('click', () => {
        globalShotList = [];
        renderShotTable();
        notesListContainer.innerHTML = '';
        mainTabs.style.display = 'none';
        viewPanels.forEach(p => p.style.display = 'none');
        shotManagerPanel.style.display = 'none';
        currentActiveClipInfo = null;
        activeShotKey = null;
    });

    // Handle Tabs
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            navTabs.forEach(t => t.classList.remove('active'));
            viewPanels.forEach(p => p.style.display = 'none');
            
            tab.classList.add('active');
            const target = document.getElementById(tab.dataset.view);
            if (target) target.style.display = 'block';
            
            if (tab.dataset.view === 'view-analyzer') {
                 if (shotManagerPanel) shotManagerPanel.style.display = 'block';
            } else {
                 if (shotManagerPanel) shotManagerPanel.style.display = 'none';
            }
        });
    });

    btnExportCSV.addEventListener('click', () => {
        if (!fs || globalShotList.length === 0) {
            alert('No shots to export or Node filesystem unavailable.');
            return;
        }

        csInterface.evalScript('$._ext.getProjectInfo()', (res) => {
            let exportDir = os.homedir() + '/Desktop';
            try {
                const data = JSON.parse(res);
                if (data.path && typeof data.path === 'string' && data.path.length > 0) {
                    exportDir = path.dirname(data.path);
                }
            } catch(e) {}

            let csvContent = "Shot Name,Start Frame,End Frame,Notes\n";
            globalShotList.forEach(s => {
                const nk = `${s.name}_${s.start}_${s.end}`;
                let note = currentNotesData[nk] || "";
                note = note.replace(/\n/g, ' ').replace(/,/g, ';');
                csvContent += `${s.name},${s.start},${s.end},${note}\n`;
            });

            const outputPath = path.join(exportDir, `FrameTrace_Export_${Date.now()}.csv`);
            try {
                fs.writeFileSync(outputPath, csvContent, 'utf8');
                alert(`Exported CSV successfully to:\n${outputPath}`);
            } catch(err) {
                alert(`Export failed: ${err.message}`);
            }
        });
    });

    
    btnSaveNote.addEventListener('click', () => {
        saveNotes();
        const orig = btnSaveNote.innerText;
        btnSaveNote.innerText = "Saved All!";
        setTimeout(() => btnSaveNote.innerText = orig, 1000);
    });

    btnDeleteNote.addEventListener('click', () => {
        if (confirm("Clear all notes for these shots?")) {
            globalShotList.forEach(shot => {
                const key = `${shot.name}_${shot.start}_${shot.end}`;
                delete currentNotesData[key];
            });
            saveNotes();
            renderNotesList();
        }
    });

    
    btnRefreshRender.addEventListener('click', () => {
        if (!currentActiveClipInfo || !fs || !path) return;
        const mediaPath = currentActiveClipInfo.mediaPath;
        const parsed = parseFileName(mediaPath.replace(/\\/g, '/').split('/').pop());
        
        const bounds = getSequenceBounds(mediaPath, parsed);
        if (!bounds) return;

        if (bounds.count === lastDetectedFramesCount) {
             refreshStatus.innerHTML = '<span style="color: #ef4444;">No new render detected.</span>';
             return;
        }

        const added = bounds.count - lastDetectedFramesCount;
        refreshStatus.innerHTML = `<span style="color: #34d399;">Detected ${added} new frames. Refreshing...</span>`;
        lastDetectedFramesCount = bounds.count;
        
        valRenderTime.innerText = bounds.lastMod;
        valRenderTotal.innerText = bounds.count;
        valRenderAdded.innerText = "+" + added;
        
        csInterface.evalScript(`$._ext.refreshMedia("${mediaPath.replace(/\\/g, '\\\\')}")`, (res) => {
            try {
                const data = JSON.parse(res);
                if (data.success) {
                    setTimeout(() => refreshStatus.innerHTML = '<span style="color: #34d399;">Sequence refreshed!</span>', 500);
                } else {
                    refreshStatus.innerText = 'Failed: ' + data.error;
                }
            } catch(e) {}
        });
    });

    
    btnHeatmapToggle.addEventListener('click', () => {
        showHeatmapNums = !showHeatmapNums;
        btnHeatmapToggle.classList.toggle('active', showHeatmapNums);
    });

    btnHeatmapAnalyze.addEventListener('click', () => {
        if (!currentActiveClipInfo || !fs || !path) return;
        heatmapContainer.innerHTML = '<div style="color: var(--text-muted); font-size: 10px;">Scanning timeline...</div>';
        
        csInterface.evalScript(`$._ext.analyzeClips("true")`, (res) => {
            try {
                const data = JSON.parse(res);
                if (!data.clips) return;
                
                const mediaPathLower = currentActiveClipInfo.mediaPath.replace(/\\/g, '/').toLowerCase();
                const parsed = parseFileName(currentActiveClipInfo.mediaPath.replace(/\\/g, '/').split('/').pop());
                const bounds = getSequenceBounds(currentActiveClipInfo.mediaPath, parsed);
                
                if (!bounds) {
                    heatmapContainer.innerHTML = 'Directory read error.';
                    return;
                }

                
                const usedIntervals = [];
                data.clips.forEach(c => {
                    if (c.mediaPath && c.mediaPath.replace(/\\/g, '/').toLowerCase() === mediaPathLower) {
                        const cp = parseFileName(c.mediaPath.replace(/\\/g, '/').split('/').pop());
                        if (cp) {
                            const cStart = cp.baseNumber + c.inPointFrames;
                            const cEnd = cStart + c.durationFrames - 1;
                            usedIntervals.push({start: cStart, end: cEnd});
                        }
                    }
                });

                
                usedIntervals.sort((a,b) => a.start - b.start);
                const mergedUsed = [];
                for (const row of usedIntervals) {
                    if (mergedUsed.length === 0) { mergedUsed.push({...row}); }
                    else {
                        const last = mergedUsed[mergedUsed.length - 1];
                        if (row.start <= last.end + 1) {
                            last.end = Math.max(last.end, row.end);
                        } else {
                            mergedUsed.push({...row});
                        }
                    }
                }

                const segments = [];
                let current = bounds.min;
                
                for (const u of mergedUsed) {
                    if (u.start > current) {
                        segments.push({ start: current, end: u.start - 1, used: false });
                    }
                    const segStart = Math.max(current, u.start);
                    const segEnd = Math.min(u.end, bounds.max);
                    if (segStart <= segEnd) {
                        segments.push({ start: segStart, end: segEnd, used: true });
                    }
                    current = Math.max(current, u.end + 1);
                }
                if (current <= bounds.max) {
                    segments.push({ start: current, end: bounds.max, used: false });
                }

                const totalFrames = bounds.max - bounds.min + 1;
                heatmapContainer.innerHTML = '';

                segments.forEach(seg => {
                    const framesCount = seg.end - seg.start + 1;
                    const percentage = (framesCount / totalFrames) * 100;
                    
                    const blk = document.createElement('div');
                    blk.className = 'heatmap-segment' + (seg.used ? ' used' : '');
                    blk.style.width = percentage + '%';
                    
                    const titleText = `Start Frame: ${seg.start}\nEnd Frame: ${seg.end}\nTotal Frames: ${framesCount}`;
                    blk.title = titleText;
                    
                    heatmapContainer.appendChild(blk);
                });
            } catch(e) {
                heatmapContainer.innerHTML = 'Error displaying heatmap.';
            }
        });
    });
});
