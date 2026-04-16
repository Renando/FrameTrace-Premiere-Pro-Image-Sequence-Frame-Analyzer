

function CSXSWindowType()
{
}

CSXSWindowType._PANEL = "Panel";

CSXSWindowType._MODELESS = "Modeless";

CSXSWindowType._MODAL_DIALOG = "ModalDialog";

EvalScript_ErrMessage = "EvalScript error.";

function Version(major, minor, micro, special)
{
    this.major = major;
    this.minor = minor;
    this.micro = micro;
    this.special = special;
}

Version.MAX_NUM = 999999999;

function VersionBound(version, inclusive)
{
    this.version = version;
    this.inclusive = inclusive;
}

function VersionRange(lowerBound, upperBound)
{
    this.lowerBound = lowerBound;
    this.upperBound = upperBound;
}

function Runtime(name, versionRange)
{
    this.name = name;
    this.versionRange = versionRange;
}

function Extension(id, name, mainPath, basePath, windowType, width, height, minWidth, minHeight, maxWidth, maxHeight,
                   defaultExtensionDataXml, specialExtensionDataXml, requiredRuntimeList, isAutoVisible, isPluginExtension)
{
    this.id = id;
    this.name = name;
    this.mainPath = mainPath;
    this.basePath = basePath;
    this.windowType = windowType;
    this.width = width;
    this.height = height;
    this.minWidth = minWidth;
    this.minHeight = minHeight;
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
    this.defaultExtensionDataXml = defaultExtensionDataXml;
    this.specialExtensionDataXml = specialExtensionDataXml;
    this.requiredRuntimeList = requiredRuntimeList;
    this.isAutoVisible = isAutoVisible;
    this.isPluginExtension = isPluginExtension;
}

function CSEvent(type, scope, appId, extensionId)
{
    this.type = type;
    this.scope = scope;
    this.appId = appId;
    this.extensionId = extensionId;
}

CSEvent.prototype.data = "";

/**
 * @class SystemPath
 * Stores operating-system-specific location constants for use in the
 * \c #CSInterface.getSystemPath() method.
 * @return A new \c SystemPath object.
 */
function SystemPath()
{
}

/** The path to user data.  */
SystemPath.USER_DATA = "userData";

SystemPath.COMMON_FILES = "commonFiles";

SystemPath.MY_DOCUMENTS = "myDocuments";

SystemPath.APPLICATION = "application";

SystemPath.EXTENSION = "extension";

SystemPath.HOST_APPLICATION = "hostApplication";

function ColorType()
{
}

ColorType.RGB = "rgb";

ColorType.GRADIENT = "gradient";

ColorType.NONE = "none";

function RGBColor(red, green, blue, alpha)
{
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
}

function Direction(x, y)
{
    this.x = x;
    this.y = y;
}

function GradientStop(offset, rgbColor)
{
    this.offset = offset;
    this.rgbColor = rgbColor;
}

function GradientColor(type, direction, numStops, arrGradientStop)
{
    this.type = type;
    this.direction = direction;
    this.numStops = numStops;
    this.arrGradientStop = arrGradientStop;
}

function UIColor(type, antialiasLevel, color)
{
    this.type = type;
    this.antialiasLevel = antialiasLevel;
    this.color = color;
}

function AppSkinInfo(baseFontFamily, baseFontSize, appBarBackgroundColor, panelBackgroundColor, appBarBackgroundColorSRGB, panelBackgroundColorSRGB, systemHighlightColor)
{
    this.baseFontFamily = baseFontFamily;
    this.baseFontSize = baseFontSize;
    this.appBarBackgroundColor = appBarBackgroundColor;
    this.panelBackgroundColor = panelBackgroundColor;
    this.appBarBackgroundColorSRGB = appBarBackgroundColorSRGB;
    this.panelBackgroundColorSRGB = panelBackgroundColorSRGB;
    this.systemHighlightColor = systemHighlightColor;
}

function HostEnvironment(appName, appVersion, appLocale, appUILocale, appId, isAppOnline, appSkinInfo)
{
    this.appName = appName;
    this.appVersion = appVersion;
    this.appLocale = appLocale;
    this.appUILocale = appUILocale;
    this.appId = appId;
    this.isAppOnline = isAppOnline;
    this.appSkinInfo = appSkinInfo;
}

function HostCapabilities(EXTENDED_PANEL_MENU, EXTENDED_PANEL_ICONS, DELEGATE_APE_ENGINE, SUPPORT_HTML_EXTENSIONS, DISABLE_FLASH_EXTENSIONS)
{
    this.EXTENDED_PANEL_MENU = EXTENDED_PANEL_MENU;
    this.EXTENDED_PANEL_ICONS = EXTENDED_PANEL_ICONS;
    this.DELEGATE_APE_ENGINE = DELEGATE_APE_ENGINE;
    this.SUPPORT_HTML_EXTENSIONS = SUPPORT_HTML_EXTENSIONS;
    this.DISABLE_FLASH_EXTENSIONS = DISABLE_FLASH_EXTENSIONS; 
}

function ApiVersion(major, minor, micro)
{
    this.major = major;
    this.minor = minor;
    this.micro = micro;
}

function MenuItemStatus(menuItemLabel, enabled, checked)
{
    this.menuItemLabel = menuItemLabel;
    this.enabled = enabled;
    this.checked = checked;
}

function ContextMenuItemStatus(menuItemID, enabled, checked)
{
    this.menuItemID = menuItemID;
    this.enabled = enabled;
    this.checked = checked;
}


function CSInterface()
{
}

CSInterface.THEME_COLOR_CHANGED_EVENT = "com.adobe.csxs.events.ThemeColorChanged";

CSInterface.prototype.hostEnvironment = window.__adobe_cep__ ? JSON.parse(window.__adobe_cep__.getHostEnvironment()) : null;

CSInterface.prototype.getHostEnvironment = function()
{
    this.hostEnvironment = JSON.parse(window.__adobe_cep__.getHostEnvironment());
    return this.hostEnvironment;
};

CSInterface.prototype.loadBinAsync = function(urlName,callback)
{
    try
    {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'arraybuffer'; 
        xhr.open('GET', urlName, true);
        xhr.onerror = function ()
        {
  		  console.log("Unable to load snapshot from given URL");
  		  return false;
		};
        xhr.send();
        xhr.onload = () => {
            window.__adobe_cep__.loadSnapshot(xhr.response);
            if (typeof callback === "function")
            {
                callback();
            }
            else if(typeof callback !== "undefined")
            {
                console.log("Provided callback is not a function");
            }
        }
    }
    catch(err)
    {
        console.log(err);
        return false;
    }

	return true;
};

CSInterface.prototype.loadBinSync  = function(pathName)
{
    try
    {
        var OSVersion = this.getOSInformation();
        if(pathName.startsWith("file://"))
        {
            if (OSVersion.indexOf("Windows") >= 0)
            {
               pathName = pathName.replace("file:///", "");
            }
            else if (OSVersion.indexOf("Mac") >= 0)
            {
                pathName = pathName.replace("file://", "");
            }
            window.__adobe_cep__.loadSnapshot(pathName);
            return true;
        }
    }
    catch(err)
    {
        console.log(err);
        return false;
    }
    //control should not come here
    return false;
};

/** Closes this extension. */
CSInterface.prototype.closeExtension = function()
{
    window.__adobe_cep__.closeExtension();
};

/**
 * Retrieves a path for which a constant is defined in the system.
 *
 * @param pathType The path-type constant defined in \c #SystemPath ,
 *
 * @return The platform-specific system path string.
 */
CSInterface.prototype.getSystemPath = function(pathType)
{
    var path = decodeURI(window.__adobe_cep__.getSystemPath(pathType));
    var OSVersion = this.getOSInformation();
    if (OSVersion.indexOf("Windows") >= 0)
    {
      path = path.replace("file:///", "");
    }
    else if (OSVersion.indexOf("Mac") >= 0)
    {
      path = path.replace("file://", "");
    }
    return path;
};

/**
 * Evaluates a JavaScript script, which can use the JavaScript DOM
 * of the host application.
 *
 * @param script    The JavaScript script.
 * @param callback  Optional. A callback function that receives the result of execution.
 *          If execution fails, the callback function receives the error message \c EvalScript_ErrMessage.
 */
CSInterface.prototype.evalScript = function(script, callback)
{
    if(callback === null || callback === undefined)
    {
        callback = function(result){};
    }
    window.__adobe_cep__.evalScript(script, callback);
};

/**
 * Retrieves the unique identifier of the application.
 * in which the extension is currently running.
 *
 * @return The unique ID string.
 */
CSInterface.prototype.getApplicationID = function()
{
    var appId = this.hostEnvironment.appId;
    return appId;
};

/**
 * Retrieves host capability information for the application
 * in which the extension is currently running.
 *
 * @return A \c #HostCapabilities object.
 */
CSInterface.prototype.getHostCapabilities = function()
{
    var hostCapabilities = JSON.parse(window.__adobe_cep__.getHostCapabilities() );
    return hostCapabilities;
};

/**
 * Triggers a CEP event programmatically. Yoy can use it to dispatch
 * an event of a predefined type, or of a type you have defined.
 *
 * @param event A \c CSEvent object.
 */
CSInterface.prototype.dispatchEvent = function(event)
{
    if (typeof event.data == "object")
    {
        event.data = JSON.stringify(event.data);
    }

    window.__adobe_cep__.dispatchEvent(event);
};

CSInterface.prototype.addEventListener = function(type, listener, obj)
{
    window.__adobe_cep__.addEventListener(type, listener, obj);
};

CSInterface.prototype.removeEventListener = function(type, listener, obj)
{
    window.__adobe_cep__.removeEventListener(type, listener, obj);
};

CSInterface.prototype.requestOpenExtension = function(extensionId, params)
{
    window.__adobe_cep__.requestOpenExtension(extensionId, params);
};

CSInterface.prototype.getExtensions = function(extensionIds)
{
    var extensionIdsStr = JSON.stringify(extensionIds);
    var extensionsStr = window.__adobe_cep__.getExtensions(extensionIdsStr);

    var extensions = JSON.parse(extensionsStr);
    return extensions;
};

CSInterface.prototype.getNetworkPreferences = function()
{
    var result = window.__adobe_cep__.getNetworkPreferences();
    var networkPre = JSON.parse(result);

    return networkPre;
};

CSInterface.prototype.initResourceBundle = function()
{
    var resourceBundle = JSON.parse(window.__adobe_cep__.initResourceBundle());
    var resElms = document.querySelectorAll('[data-locale]');
    for (var n = 0; n < resElms.length; n++)
    {
       var resEl = resElms[n];
       
       var resKey = resEl.getAttribute('data-locale');
       if (resKey)
       {
           
           for (var key in resourceBundle)
           {
               if (key.indexOf(resKey) === 0)
               {
                   var resValue = resourceBundle[key];
                   if (key.length == resKey.length)
                   {
                        resEl.innerHTML = resValue;
                   }
                   else if ('.' == key.charAt(resKey.length))
                   {
                        var attrKey = key.substring(resKey.length + 1);
                        resEl[attrKey] = resValue;
                   }
               }
           }
       }
    }
    return resourceBundle;
};

CSInterface.prototype.dumpInstallationInfo = function()
{
    return window.__adobe_cep__.dumpInstallationInfo();
};

CSInterface.prototype.getOSInformation = function()
{
    var userAgent = navigator.userAgent;

    if ((navigator.platform == "Win32") || (navigator.platform == "Windows"))
    {
        var winVersion = "Windows";
        var winBit = "";
        if (userAgent.indexOf("Windows") > -1)
        {
            if (userAgent.indexOf("Windows NT 5.0") > -1)
            {
                winVersion = "Windows 2000";
            }
            else if (userAgent.indexOf("Windows NT 5.1") > -1)
            {
                winVersion = "Windows XP";
            }
            else if (userAgent.indexOf("Windows NT 5.2") > -1)
            {
                winVersion = "Windows Server 2003";
            }
            else if (userAgent.indexOf("Windows NT 6.0") > -1)
            {
                winVersion = "Windows Vista";
            }
            else if (userAgent.indexOf("Windows NT 6.1") > -1)
            {
                winVersion = "Windows 7";
            }
            else if (userAgent.indexOf("Windows NT 6.2") > -1)
            {
                winVersion = "Windows 8";
            }
            else if (userAgent.indexOf("Windows NT 6.3") > -1)
            {
                winVersion = "Windows 8.1";
            }
            else if (userAgent.indexOf("Windows NT 10") > -1)
            {
                winVersion = "Windows 10";
            }

            if (userAgent.indexOf("WOW64") > -1 || userAgent.indexOf("Win64") > -1)
            {
                winBit = " 64-bit";
            }
            else
            {
                winBit = " 32-bit";
            }
        }

        return winVersion + winBit;
    }
    else if ((navigator.platform == "MacIntel") || (navigator.platform == "Macintosh"))
    {
        var result = "Mac OS X";

        if (userAgent.indexOf("Mac OS X") > -1)
        {
            result = userAgent.substring(userAgent.indexOf("Mac OS X"), userAgent.indexOf(")"));
            result = result.replace(/_/g, ".");
        }

        return result;
    }

    return "Unknown Operation System";
};

CSInterface.prototype.openURLInDefaultBrowser = function(url)
{
    return cep.util.openURLInDefaultBrowser(url);
};

CSInterface.prototype.getExtensionID = function()
{
     return window.__adobe_cep__.getExtensionId();
};

CSInterface.prototype.getScaleFactor = function()
{
    return window.__adobe_cep__.getScaleFactor();
};

 if(navigator.appVersion.toLowerCase().indexOf("windows") >= 0) {
    CSInterface.prototype.getMonitorScaleFactor = function()
    {
        return window.__adobe_cep__.getMonitorScaleFactor();
    };
}

CSInterface.prototype.setScaleFactorChangedHandler = function(handler)
{
    window.__adobe_cep__.setScaleFactorChangedHandler(handler);
};

CSInterface.prototype.getCurrentApiVersion = function()
{
    var apiVersion = JSON.parse(window.__adobe_cep__.getCurrentApiVersion());
    return apiVersion;
};

CSInterface.prototype.setPanelFlyoutMenu = function(menu)
{
    if ("string" != typeof menu)
    {
        return;
    }

    window.__adobe_cep__.invokeSync("setPanelFlyoutMenu", menu);
};

CSInterface.prototype.updatePanelMenuItem = function(menuItemLabel, enabled, checked)
{
    var ret = false;
    if (this.getHostCapabilities().EXTENDED_PANEL_MENU)
    {
        var itemStatus = new MenuItemStatus(menuItemLabel, enabled, checked);
        ret = window.__adobe_cep__.invokeSync("updatePanelMenuItem", JSON.stringify(itemStatus));
    }
    return ret;
};


CSInterface.prototype.setContextMenu = function(menu, callback)
{
    if ("string" != typeof menu)
    {
        return;
    }

    window.__adobe_cep__.invokeAsync("setContextMenu", menu, callback);
};

CSInterface.prototype.setContextMenuByJSON = function(menu, callback)
{
    if ("string" != typeof menu)
    {
        return;
    }

    window.__adobe_cep__.invokeAsync("setContextMenuByJSON", menu, callback);
};

CSInterface.prototype.updateContextMenuItem = function(menuItemID, enabled, checked)
{
    var itemStatus = new ContextMenuItemStatus(menuItemID, enabled, checked);
    ret = window.__adobe_cep__.invokeSync("updateContextMenuItem", JSON.stringify(itemStatus));
};

CSInterface.prototype.isWindowVisible = function()
{
    return window.__adobe_cep__.invokeSync("isWindowVisible", "");
};

/**
 * Resize extension's content to the specified dimensions.
 * 1. Works with modal and modeless extensions in all Adobe products.
 * 2. Extension's manifest min/max size constraints apply and take precedence.
 * 3. For panel extensions
 *    3.1 This works in all Adobe products except:
 *        * Premiere Pro
 *        * Prelude
 *        * After Effects
 *    3.2 When the panel is in certain states (especially when being docked),
 *        it will not change to the desired dimensions even when the
 *        specified size satisfies min/max constraints.
 *
 * Since 6.0.0
 *
 * @param width  The new width
 * @param height The new height
 */
CSInterface.prototype.resizeContent = function(width, height)
{
    window.__adobe_cep__.resizeContent(width, height);
};

/**
 * Register the invalid certificate callback for an extension.
 * This callback will be triggered when the extension tries to access the web site that contains the invalid certificate on the main frame.
 * But if the extension does not call this function and tries to access the web site containing the invalid certificate, a default error page will be shown.
 *
 * Since 6.1.0
 *
 * @param callback the callback function
 */
CSInterface.prototype.registerInvalidCertificateCallback = function(callback)
{
    return window.__adobe_cep__.registerInvalidCertificateCallback(callback);
};

/**
 * Register an interest in some key events to prevent them from being sent to the host application.
 *
 * This function works with modeless extensions and panel extensions.
 * Generally all the key events will be sent to the host application for these two extensions if the current focused element
 * is not text input or dropdown,
 * If you want to intercept some key events and want them to be handled in the extension, please call this function
 * in advance to prevent them being sent to the host application.
 *
 * Since 6.1.0
 *
 * @param keyEventsInterest      A JSON string describing those key events you are interested in. A null object or
                                 an empty string will lead to removing the interest
 *
 * This JSON string should be an array, each object has following keys:
 *
 * keyCode:  [Required] represents an OS system dependent virtual key code identifying
 *           the unmodified value of the pressed key.
 * ctrlKey:  [optional] a Boolean that indicates if the control key was pressed (true) or not (false) when the event occurred.
 * altKey:   [optional] a Boolean that indicates if the alt key was pressed (true) or not (false) when the event occurred.
 * shiftKey: [optional] a Boolean that indicates if the shift key was pressed (true) or not (false) when the event occurred.
 * metaKey:  [optional] (Mac Only) a Boolean that indicates if the Meta key was pressed (true) or not (false) when the event occurred.
 *                      On Macintosh keyboards, this is the command key. To detect Windows key on Windows, please use keyCode instead.
 * An example JSON string:
 *
 * [
 *     {
 *         "keyCode": 48
 *     },
 *     {
 *         "keyCode": 123,
 *         "ctrlKey": true
 *     },
 *     {
 *         "keyCode": 123,
 *         "ctrlKey": true,
 *         "metaKey": true
 *     }
 * ]
 *
 */
CSInterface.prototype.registerKeyEventsInterest = function(keyEventsInterest)
{
    return window.__adobe_cep__.registerKeyEventsInterest(keyEventsInterest);
};

CSInterface.prototype.setWindowTitle = function(title)
{
    window.__adobe_cep__.invokeSync("setWindowTitle", title);
};

CSInterface.prototype.getWindowTitle = function()
{
    return window.__adobe_cep__.invokeSync("getWindowTitle", "");
};
