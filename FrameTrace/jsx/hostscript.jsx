function safeString(str) {
    if (!str) return "";
    return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '');
}

function makeError(msg) {
    return '{"error":"' + safeString(msg) + '"}';
}

$._ext = {
    getProjectInfo: function() {
        try {
            var path = app.project.path;
            if (!path) return '{"path":""}';
            return '{"path":"' + safeString(path) + '"}';
        } catch (e) {
            return makeError(e.message);
        }
    },
    
    jumpToTime: function(ticksString) {
        try {
            if (app.project.activeSequence) {
                app.project.activeSequence.setPlayerPosition(ticksString);
                return '{"success":true}';
            }
            return makeError("No active sequence");
        } catch(e) {
             return makeError(e.message);
        }
    },

    analyzeClips: function(analyzeAll) {
        try {
            var selectedClips = [];
            var proj = app.project;
            if (!proj) return makeError("No project open.");

            var seq = proj.activeSequence;
            if (!seq) return makeError("No active sequence.");

            var timebase = parseFloat(seq.timebase);
            var fps = 0;
            try {
                var settings = seq.getSettings();
                if (settings) {
                    var vfr = settings.videoFrameRate;
                    if (vfr) {
                        if (typeof vfr.seconds !== 'undefined') {
                            fps = Math.round((1 / vfr.seconds) * 100) / 100;
                        } else {
                            fps = parseFloat(vfr);
                        }
                    }
                }
            } catch (e) {
                
            }
            
            if (!fps || isNaN(fps) || fps <= 0) {
                fps = Math.round((254016000000 / timebase) * 100) / 100;
            }
            
            var nonImageSelected = false;

            for (var i = 0; i < seq.videoTracks.numTracks; i++) {
                var track = seq.videoTracks[i];
                for (var j = 0; j < track.clips.numItems; j++) {
                    var clip = track.clips[j];
                    if (analyzeAll === "true" || clip.isSelected()) {
                        var pItem = clip.projectItem;
                        if (pItem) {
                            var mediaPath = pItem.getMediaPath();
                            var name = pItem.name;
                            
                            
                            var isImg = false;
                            if (mediaPath && typeof mediaPath === "string") {
                                isImg = mediaPath.match(/\.(png|exr|tiff|tif|jpg|jpeg)$/i) !== null;
                            }
                            
                            if (isImg) {
                                
                                var clipFps = fps;
                                var clipTicksPerFrame = timebase;
                                
                                
                                try {
                                    var xml = pItem.getProjectMetadata();
                                    if (xml) {
                                        var match = xml.match(/videoFrameRate[^>]*>([^<]+)</i);
                                        if (match && match[1]) {
                                            var f = parseFloat(match[1]);
                                            if (!isNaN(f) && f > 0) {
                                                clipFps = f;
                                                clipTicksPerFrame = 254016000000 / clipFps;
                                            }
                                        }
                                    }
                                } catch (e) {
                                    
                                }

                                var inPointTicks = parseFloat(clip.inPoint.ticks);
                                var startTicks = parseFloat(clip.start.ticks);
                                var durationTicks = parseFloat(clip.duration.ticks);

                                var inPointFrames = Math.round(inPointTicks / clipTicksPerFrame);
                                var durationFrames = Math.round(durationTicks / clipTicksPerFrame);

                                selectedClips.push({
                                    name: name,
                                    mediaPath: mediaPath,
                                    inPointFrames: inPointFrames,
                                    durationFrames: durationFrames,
                                    startTicks: clip.start.ticks, 
                                    ticksPerFrame: clipTicksPerFrame,
                                    clipFps: clipFps 
                                });
                            } else {
                                if (analyzeAll === "false" || clip.isSelected()) {
                                    nonImageSelected = true;
                                }
                            }
                        }
                    }
                }
            }

            if (selectedClips.length === 0) {
                if (nonImageSelected) {
                    return makeError("This clip is not an image sequence.");
                }
                var errStr = (analyzeAll === "true") ? "No image sequence clips found in the timeline." : "No clips selected.";
                return makeError(errStr);
            }

            
            var str = '{"success":true,"fps":' + fps + ',"clips":[';
            for (var k = 0; k < selectedClips.length; k++) {
                var c = selectedClips[k];
                var sName = safeString(c.name);
                var sPath = safeString(c.mediaPath);
                str += '{"name":"' + sName + '","mediaPath":"' + sPath + '","inPointFrames":' + c.inPointFrames + ',"durationFrames":' + c.durationFrames + ',"startTicks":"' + c.startTicks + '","ticksPerFrame":' + c.ticksPerFrame + ',"clipFps":' + c.clipFps + '}';
                if (k < selectedClips.length - 1) str += ',';
            }
            str += ']}';
            return str;

        } catch (e) {
            return makeError("Script Error: " + e.message + " (Line: " + e.line + ")");
        }
    },

    refreshMedia: function(mediaPathToFind) {
        try {
            var proj = app.project;
            if (!proj) return makeError("No project open.");

            var foundItem = null;
            function searchItem(root) {
                for (var i = 0; i < root.children.numItems; i++) {
                    var item = root.children[i];
                    if (item.type === 2) { 
                        searchItem(item);
                        if (foundItem) return;
                    } else if (item.type === 1) { 
                        var p = item.getMediaPath();
                        if (p && p.replace(/\\/g, '/').toLowerCase() === mediaPathToFind.replace(/\\/g, '/').toLowerCase()) {
                            foundItem = item;
                            return;
                        }
                    }
                }
            }
            
            searchItem(proj.rootItem);
            
            if (foundItem) {
                
                var success = foundItem.changeMediaPath(foundItem.getMediaPath());
                return '{"success":' + (success ? "true" : "false") + '}';
            } else {
                return makeError("Could not find project item with given media path.");
            }
        } catch(e) {
            return makeError("Script Error: " + e.message + " (Line: " + e.line + ")");
        }
    }
};
