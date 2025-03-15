/*
 * Si la variable IndicateurIgnorerDomaine n'est pas définit c'est qu'on veut setter le domaine à omnivox.ca
 * On ne set pas le domaine si on est IE
 *
 * Je refactor le code afin de pouvoir forcer le domaine meme dans IE
 */
function SpecifierDomaine() {
    if (document.domain.toLocaleLowerCase().indexOf("intraflex.ca") > 0) {
        document.domain = "intraflex.ca";
    } else {
        document.domain = "omnivox.ca";
    }
}

if (typeof (IndicateurIgnorerDomaine) === 'undefined' && navigator.appName !== 'Microsoft Internet Explorer') {
    SpecifierDomaine();
}

/*Copyright ©2000-2007, Skytech Communications Inc.*/

var toolTipDernierDivAffiche = null;
var scrollBarPosition = 0;
var afficherDivTimeout;

function Over(strImg, intImg) {
//Cette fonction mais l'objet passé en paramètre(objImg) en
//surbrillance avec l'image du numéro intImg

    //On construit l'objet à avoir la surbrillance et on change
    //sa propriété source.
    eval('document.' + strImg + '.src = ImagesOn[' + intImg + '].src');

}

function Out(strImg, intImg) {
//Cette fonction mais l'objet passé en paramètre(objImg) en
//état normal avec l'image du numéro intImg

    //On construit l'objet à avoir la surbrillance et on change
    //sa propriété source.
    eval('document.' + strImg + '.src = ImagesOff[' + intImg + '].src');

}

function OuvrirWindow(strURL, strNom, strProp) {
    //Ouvre une fenêtre selon les options passées en paramètres
    //strURL = adresse de la page à ouvrir
    //strNom = Nom de la fenêtre
    //strProp = Propriété de la fenêtre
    //			exemple: 'fullscreen=no,toolbar=no,location=no,directories=no,status=no,menubar=no,height=400,width=700,resizable=yes,scrollbars=no'

    if (strNom == '') {
        wnd = open(strURL);
    } else {
        wnd = open(strURL, strNom, strProp);
    }

}

function OpenCentre(strURL, strNom, strProp, intWidth, intHeight, returnWindow) {
    //Ouvre une fenêtre CENTRÉE selon les options passées en paramètres
    //strURL = adresse de la page à ouvrir
    //strNom = Nom de la fenêtre
    //strProp = Propriétés de la fenêtre (NE PAS INCLURE LES PROPRIÉTÉS POUR LA POSITION DE LA FENÊTRE SVP. screenx, screeny, left, top, height, width)
    //			exemple: 'fullscreen=no,toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=yes,scrollbars=no'
    var iPosX;
    var iPosY;
    var wnd;

    //Pour les open window des MIO, on a une petite fonction spéciale
    if (strNom == 'ModuleMIOE' || strNom == 'ModuleMIOP')
        return OpenWindowMio(strURL, strNom);


    if (navigator.appVersion.substring(0, 1) >= 4) {
        //On calcul la position du milieu de l'écran (selon la taille de la fenêtre
        iPosX = Math.round((screen.availWidth / 2) - (intWidth / 2))
        iPosY = Math.round((screen.availHeight / 2) - (intHeight / 2))
    } else {
        //On position à un endroit fixe...
        intPosX = 100
        intPosY = 100
    }

    wnd = window.open(strURL, strNom, 'screenx=' + iPosX + ',screeny=' + iPosY + ',left=' + iPosX + ',top=' + iPosY + ',height=' + intHeight + ',width=' + intWidth + ',' + strProp);
    wnd.focus();

    if (returnWindow != null && returnWindow)
        return wnd;
}


//Function pour le popup des mio2
function OpenWindowMio(strURL, strNom) {

    //Ouvre une fenêtre CENTRÉE selon les options passées en paramètres
    //strURL = adresse de la page à ouvrir
    //strNom = Nom de la fenêtre

    var iPosX;
    var iPosY;
    var wnd;

    var browser = navigator.appName;
    var version = navigator.appVersion;

    var pxWidth;
    var pxHeigth;


    try {
        pxWidth = Math.floor(screen.width * 0.95);
        pxHeigth = Math.floor(screen.height * 0.92);
    } catch (e) {
        //En IE6 il semble que le floor ne fonctionne pas!
        pxWidth = screen.width - 80;
        pxHeigth = screen.height - 100;
    }

    //On s'assure d'un taille minimum
    if (pxWidth < 620)
        pxWidth = 620;
    if (pxHeigth < 460)
        pxHeigth = 460;


    if (version.substring(0, 1) >= 4) {
        //On calcul la position du milieu de l'écran (selon la taille de la fenêtre
        iPosX = Math.round((screen.availWidth / 2) - (pxWidth / 2))
        iPosY = Math.round((screen.availHeight / 2) - (pxHeigth / 2))
    } else {
        //On position à un endroit fixe...
        intPosX = 100
        intPosY = 100
    }


    if (screen.height <= 600) {

        wnd = window.open(strURL, strNom, ',screenx=' + iPosX + ',screeny=' + iPosY + ',left=' + iPosX + ',top=' + iPosY + ',height=' + pxHeigth + ',width=' + pxWidth + ',fullscreen=no,toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=yes,scrollbars=yes');
    } else if (navigator.userAgent.match("Chrome") != null) {

        wnd = window.open(strURL, strNom, ',screenx=' + iPosX + ',screeny=' + iPosY + ',left=' + iPosX + ',top=' + iPosY + ',height=' + pxHeigth + ',width=' + pxWidth + ',fullscreen=no,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,resizable=yes,scrollbars=yes');
    } else if (browser == "Netscape") {

        wnd = window.open(strURL, strNom, ',screenx=' + iPosX + ',screeny=' + iPosY + ',left=' + iPosX + ',top=' + iPosY + ',height=' + pxHeigth + ',width=' + pxWidth + ',fullscreen=no,toolbar=yes,location=yes,directories=no,status=no,menubar=yes,resizable=yes,scrollbars=yes');
    } else if (browser == "Microsoft Internet Explorer") {

        if (version.substring(version.toLowerCase().indexOf("msie ") + 5, version.toLowerCase().indexOf("msie ") + 6) > 6) {

            wnd = window.open(strURL, strNom, ',screenx=' + iPosX + ',screeny=' + iPosY + ',left=' + iPosX + ',top=' + iPosY + ',height=' + pxHeigth + ',width=' + pxWidth + ',fullscreen=no,toolbar=no,location=yes,directories=no,status=no,menubar=yes,resizable=yes,scrollbars=yes');
        } else {

            wnd = window.open(strURL, strNom, ',screenx=' + iPosX + ',screeny=' + iPosY + ',left=' + iPosX + ',top=' + iPosY + ',height=' + pxHeigth + ',width=' + pxWidth + ',fullscreen=no,toolbar=yes,location=yes,directories=yes,status=no,menubar=yes,resizable=yes,scrollbars=yes');
        }
    } else {

        wnd = window.open(strURL, strNom, ',screenx=' + iPosX + ',screeny=' + iPosY + ',left=' + iPosX + ',top=' + iPosY + ',height=' + pxHeigth + ',width=' + pxWidth + ',fullscreen=no,toolbar=no,location=yes,directories=no,status=no,menubar=yes,resizable=yes,scrollbars=yes');
    }

    wnd.focus();

}


/**
 * Permet de trouver le nombre de pixel à partir de la gauche pour un élément dans la page
 */
function getLeft(oNode) /*:int*/ {
    var iLeft = 0;

    if (document.layer) {
        while (oNode.tagName != "BODY") {
            iLeft += oNode.offsetLeft;
            oNode = oNode.offsetParent;
        }
    } else {
        iLeft = oNode.offsetLeft;
    }

    return iLeft;
}

/**
 * Permet de trouver le nombre de pixel à partir du haut pour un élément dans la page
 */
function getTop(oNode) /*:int*/ {
    var iTop = 0;

    //si on a des layer c'est qu'on est en Mozilla
    if (document.layer) {
        while (oNode.tagName != "BODY") {
            iTop += oNode.offsetTop;
            oNode = oNode.offsetParent;
        }
    } else {
        iTop = oNode.offsetTop;
    }

    return iTop;
}

/**
 *    id 			= Id du div à afficher
 *    cmd 		= affichage à lui donner
 *    alignement	= Gauche ou Droit
 */
function afficheDivErrorProvider(id, cmd, alignement, timeOut) {
    var delayTimeOut;

    if (timeOut == null)
        delayTimeOut = 0;
    else
        delayTimeOut = timeOut;

    if (toolTipDernierDivAffiche != null)
        toolTipDernierDivAffiche.style.display = "none";

    var obj;
    if (document.getElementById)
        obj = document.getElementById(id);
    else if (document.all)
        obj = document.all[id];
    else
        obj = document[id];

    if (!obj) {
        //[B37101] Ajout d'un tooltip permettant d'afficher la note exacte dans les notes d'évaluations
        //On a pas de moyenne pour cete row, on retourne
        return;
    }

    if (delayTimeOut > 0) {
        afficherDivTimeout = setTimeout(function () {
            obj.style.visibility = "visible";
            if (cmd == 'visible') {
                obj.style.display = "block";
            } else {
                obj.style.display = "none";
            }
        }, delayTimeOut);
    } else {
        obj.style.visibility = "visible";
        if (cmd == 'visible') {
            obj.style.display = "block";
        } else {
            clearTimeout(afficherDivTimeout);
            obj.style.display = "none";
        }
    }

    if (getLeft(obj) + obj.offsetWidth > document.body.clientWidth) {
        obj.style.left = document.body.clientWidth - obj.offsetWidth - 20 + "px";
    }

    toolTipDernierDivAffiche = obj;
}

function GetOnMouseOver(texte) {
    return true;
}

function GetOnMouseOut() {
    return true;
}

/* Permet d'obtenir la position de la scroll bar et le met dans des champs hidden de la page
 * Ici, on utilise les champs hidden IsKeepScrollBarPositionX et IsKeepScrollBarPositionY pour conserver nos valeurs
 */
function GetScrollBarPosition() {
    var scrollX, scrollY;

    if (document.getElementById("IsKeepScrollBarPositionX") != null && document.getElementById("IsKeepScrollBarPositionX") != null) {

        if (document.all) {
            if (!document.documentElement.scrollLeft)
                scrollX = document.body.scrollLeft;
            else
                scrollX = document.documentElement.scrollLeft;

            if (!document.documentElement.scrollTop)
                scrollY = document.body.scrollTop;
            else
                scrollY = document.documentElement.scrollTop;
        } else {
            scrollX = window.pageXOffset;
            scrollY = window.pageYOffset;
        }

        document.getElementById("IsKeepScrollBarPositionX").value = scrollX;
        document.getElementById("IsKeepScrollBarPositionY").value = scrollY;
    }
} //GetScrollBarPosition

function GetScrollBarPositionX() {
    var scrollX;

    if (document.all) {
        if (!document.documentElement.scrollLeft)
            scrollX = document.body.scrollLeft;
        else
            scrollX = document.documentElement.scrollLeft;
    } else {
        scrollX = window.pageXOffset;
    }
    return scrollX;
} //GetScrollBarPositionX

function GetScrollBarPositionY() {
    var scrollY;

    if (document.all) {

        if (!document.documentElement.scrollTop)
            scrollY = document.body.scrollTop;
        else
            scrollY = document.documentElement.scrollTop;
    } else {
        scrollY = window.pageYOffset;
    }
    return scrollY;
} //GetScrollBarPositionY

/* Ici, on va chercher notre valeur dans les champs hidden et on set la position de la page à cette même valeur
 * Les champs hidden où l'on va chercher nos données sont IsKeepScrollBarPositionX et IsKeepScrollBarPositionY
 */
function GoToLastScrollBarPosition() {
    var x = document.getElementById("IsKeepScrollBarPositionX").value;
    var y = document.getElementById("IsKeepScrollBarPositionY").value;

    window.scrollTo(x, y);
}

function GoToLastScrollBarPositionXY(scrollX, scrollY) {
    window.scrollTo(scrollX, scrollY);
}

/*
 * Cette fonction affiche un instant SVP dans la classe virtuelle.
 */
function AfficheUnInstant() {
    var div = document.getElementById("divUnInstantSVP")
    if (div != null)
        div.style.display = "inline";
}

function AfficherInfoBulle(posX, posY, idBulle) {
    try {

        var div = document.getElementById(idBulle);

        div.style.left = posX + 'px';
        div.style.top = posY + 'px';
        div.style.display = 'block';

    } catch (e) {
        //throw e + " for Id " + idBulle;
    }

}

// Permet de cacher toures les infobulles en meme temps
function CacherInfoBulles() {
    var end = listeBulles.length - 1; //On enleve le dernier element inexistent
    var obj;
    var i = 0;
    for (i; i < end; i++) {

        obj = document.getElementById(listeBulles[i]);

        if (obj != null) {
            obj.style.display = "none";
        }
        obj = null;
    } // for
}

//Permet de cacher une infobulle selon son ID
function CacherInfoBulleId(id) {
    var obj;
    obj = document.getElementById(id);
    if (obj != null) {
        obj.style.display = "none";
    }

}


// Permet d'afficher toutes les infobulles
function AfficherInfoBulles() {

    var end = listeBulles.length - 1; //On enleve le dernier element inexistent
    var obj;
    var i = 0;
    for (i; i < end; i++) {

        obj = document.getElementById(listeBulles[i]);

        if (obj != null) {
            obj.style.display = "block";
        }
        obj = null;
    } // for

}

//Permet de copier une valeur dans le clipboard ou d'envoyer la personne vers une autre page qui lui genere un lien, selon le fureteur utilisé
//	texte = texte qui devra etre copier dans le clipboard
//	msgDictio = message de confirmation du dictio
// 	msgErreur = message d'erreur du dictio
//	urlNonIE = URL qui permettra de generer le lien et les informations necessaires dans les fureteurs autres que IE
//	intL = longueur de la fenetre a presenter
//	intH = hauteur de la fenetre a presenter
function CopyToClipboard(texte, msgDictio, msgErreur, urlNonIE, intL, intH) {
    // IE  - utiliser le code existant pour le clipboard
    if (window.clipboardData && clipboardData.setData) {
        if (clipboardData.setData("Text", texte)) {
            alert(msgDictio);
        } else {
            alert(msgErreur);

            // Firefox et autres, on ouvre un popup qui va generer ce dont nous avons besoin - voir module Liste de distribution pour un exemple
            //	La fonction OpenCentre existe dans ce meme fichier
            var props = 'fullscreen=no,toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=yes,scrollbars=no';
            OpenCentre(urlNonIE, "clipboard", props, intL, intH);

        }
    } else {
        // Firefox et autres, on ouvre un popup qui va generer ce dont nous avons besoin - voir module Liste de distribution pour un exemple
        //	La fonction OpenCentre existe dans ce meme fichier
        var props = 'fullscreen=no,toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=yes,scrollbars=no';
        OpenCentre(urlNonIE, "clipboard", props, intL, intH);
    }

}

//Version plus simplifié de OpenCentre qui permet d'ouvrir une page pour un preview
function OpenCentrePreview(url, nom, intL, intH) {

    var props = 'fullscreen=no,toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=yes,scrollbars=yes';
    OpenCentre(url, nom, props, intL, intH);
}

//nous permet d'ajouter des evenements sur un objet...
function AddEvents(obj, evTypes, fn) {
    for (i = 0; i < evTypes.length; i++) AddEvent(obj, evTypes[i], fn);
}

function AddEvent(obj, evType, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(evType, fn, false);
        return true;
    } else if (obj.attachEvent) {
        var r = obj.attachEvent('on' + evType, fn);
        return r;
    } else {
        return false;
    }
}

//un document.getelement plus court..
function GE(id) {
    return document.getElementById(id);
}

function cC(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function rC(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eC(name) {
    cC(name, "", -1);
}


function errorHandlerProd(a, b, c) {
    return errorHandler(a, b, c, false)
}

function errorHandlerBureau(a, b, c) {
    return errorHandler(a, b, c, true)
}

function errorHandler(a, b, c, isBureau, url) {
    if (navigator.appVersion.toLowerCase().indexOf("msie 6.") >= 0)
        return true;

    var doc;
    var iframe;
    var hid1;
    var hid2;
    var hid3;
    var hid4;
    var form;
    if (GE('javascript_error_form')) {
        doc = GE('javascript_error_form').contentDocument;

        if (doc == undefined || doc == null)
            doc = GE('javascript_error_form').contentWindow.document;
    } else {
        iframe = document.createElement("iframe");

        iframe.id = "javascript_error_form";
        iframe.style.height = "0px";
        iframe.style.width = "0px";
        iframe.style.border = "none";


        document.body.appendChild(iframe);
        doc = iframe.contentDocument;

        if (doc == undefined || doc == null)
            doc = iframe.contentWindow.document;
        doc.open();
        doc.write('<body></body>');
        doc.close();

    }
    form = doc.createElement("form");
    doc.body.appendChild(form);

    hid1 = doc.createElement("input");
    hid2 = doc.createElement("input");
    hid3 = doc.createElement("input");
    hid4 = doc.createElement("input");
    hid1.id = "a";
    hid2.id = "b";
    hid3.id = "c";
    hid4.id = "url";
    hid1.type = "hidden";
    hid2.type = "hidden";
    hid3.type = "hidden";
    hid4.type = "hidden";
    form.appendChild(hid1);
    form.appendChild(hid2);
    form.appendChild(hid3);
    form.appendChild(hid4);

    hid1.name = "a";
    hid2.name = "b";
    hid3.name = "c";
    hid4.name = "url";
    hid1.value = a;
    hid2.value = b;
    hid3.value = c;
    hid4.value = document.location;

    if (url != null)
        form.action = url;
    else
        form.action = document.location.protocol + "//" + document.domain + window.location.pathname.substring(0, 5) + "/JavascriptErrorHandler.ashx" + document.location.search;
    form.method = "post";
    doc.forms[0].submit();

    return !isBureau;
}

function getViewPortWidth() {
    var viewPortWidth;
    var isIE = false;
    if (typeof (window.innerWidth) == 'number') {
        //Non-IE
        viewPortWidth = window.innerWidth;
    } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        //IE 6+ in 'standards compliant mode'
        viewPortWidth = document.documentElement.clientWidth;
        isIE = true;
    } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
        //IE 4 compatible
        viewPortWidth = document.body.clientWidth;
        isIE = true;
    } // if
    return viewPortWidth;
}

function getViewPortHeight() {
    var viewPortHeight;
    var isIE = false;
    if (typeof (window.innerWidth) == 'number') {
        //Non-IE
        viewPortHeight = window.innerHeight;
    } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        //IE 6+ in 'standards compliant mode'
        viewPortHeight = document.documentElement.clientHeight;
        isIE = true;
    } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
        //IE 4 compatible
        viewPortHeight = document.body.clientHeight;
        isIE = true;
    } // if
    return viewPortHeight;
}

var lastID = null;

function ShowRSS(id) {
    if (lastID != id)
        if (document.getElementById(lastID))
            if (document.getElementById(lastID).style.display == "block")
                document.getElementById(lastID).style.display = "none";

    lastID = id;
    setCorrectTop();
    var h = self.innerHeight || (document.documentElement.clientHeight || document.body.clientHeight);

    if (document.getElementById(id)) {
        var pop = document.getElementById(id).style;
        var popW = document.getElementById("W" + id).style;

        if (pop.display == "none") {
            pop.display = "block";
            popW.height = (h - 170) + 'px';

            if (document.getElementById("rssOver") == null) {
                var objBody = document.getElementsByTagName("body").item(0);

                var objOverlay = document.createElement("div");
                objOverlay.setAttribute('id', 'rssOver');
                objOverlay.style.display = 'none';
                objOverlay.onclick = function () {
                    ShowRSS('');
                }
                objBody.appendChild(objOverlay);
            }
            if (document.getElementById('ifrm' + lastID) == null) {
                var objIframeRss = document.createElement("iframe");
                objIframeRss.setAttribute('id', 'ifrm' + lastID);
                objIframeRss.setAttribute('class', 'ifrmrssw');
                objIframeRss.setAttribute('src', partRssUrl + '&CatRss=' + lastID);
                objIframeRss.style.width = 0 + 'px';
                objIframeRss.style.height = 0 + 'px';
                document.getElementById("W" + id).appendChild(objIframeRss);
            }
        } else {
            pop.display = "none";
        }
    }

    if (document.getElementById("rssOver") == null)
        return;

    var popOv = document.getElementById("rssOver").style;
    if (popOv.display == "none") {
        popOv.display = "block";
        var arrayPageSize = getPageSize();

        popOv.width = arrayPageSize[0] + 'px';
        /*popOv.height = arrayPageSize[1] + 'px';*/
    } else {
        popOv.display = "none";
    }
}//ShowRSS
function f_scrollTop() {
    return f_filterResults(
        window.pageYOffset ? window.pageYOffset : 0,
        document.documentElement ? document.documentElement.scrollTop : 0,
        document.body ? document.body.scrollTop : 0
    );
}//f_scrollTop
function f_filterResults(n_win, n_docel, n_body) {
    var n_result = n_win ? n_win : 0;
    if (n_docel && (!n_result || (n_result > n_docel)))
        n_result = n_docel;
    return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
}//f_filterResults
function setCorrectTop() {
    if (document.getElementById(lastID)) {
        document.getElementById(lastID).style.top = (f_scrollTop() + 100) + 'px';
    }
}

function getPageSize() {

    var xScroll, yScroll;

    if (window.innerHeight && window.scrollMaxY) {
        xScroll = window.innerWidth + window.scrollMaxX;
        yScroll = window.innerHeight + window.scrollMaxY;
    } else if (document.body.scrollHeight > document.body.offsetHeight) {
        xScroll = document.body.scrollWidth;
        yScroll = document.body.scrollHeight;
    } else {
        xScroll = document.body.offsetWidth;
        yScroll = document.body.offsetHeight;
    }

    var windowWidth, windowHeight;


    if (self.innerHeight) {
        if (document.documentElement.clientWidth) {
            windowWidth = document.documentElement.clientWidth;
        } else {
            windowWidth = self.innerWidth;
        }
        windowHeight = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) {
        windowWidth = document.documentElement.clientWidth;
        windowHeight = document.documentElement.clientHeight;
    } else if (document.body) {
        windowWidth = document.body.clientWidth;
        windowHeight = document.body.clientHeight;
    }

    if (yScroll < windowHeight) {
        pageHeight = windowHeight;
    } else {
        pageHeight = yScroll;
    }


    if (xScroll < windowWidth) {
        pageWidth = xScroll;
    } else {
        pageWidth = windowWidth;
    }

    arrayPageSize = new Array(pageWidth, pageHeight, windowWidth, windowHeight)
    return arrayPageSize;
}

function EscapeHandlerRSS(e) {

    if (document.getElementById("rssOver") == null)
        return;
    if (document.getElementById("rssOver").style.display == "none")
        return;
    e = e || window.event;
    if (e.keyCode + "" == "27") {
        ShowRSS('');
    }
}//EscapeHandler


function isDefined(variable) {
    return eval('(typeof(' + variable + ') != "undefined")');
}

/* Mathieu: 2013-01-07 [F20618] Attache l'évènement scroll et affiche le footer à la bonne place

 je vérifie aussi si le jquery est présent dans la page pour éviter l'erreur $ is undefined*/
if (typeof jQuery != "undefined") {
    $(document).ready(function () {
        if ($('#Gen_Footer').length == 1) {
            //il faut ajouter un padding au parent du footer sinon les browser on du mal à calculer la position du footer
            $('#Gen_Footer').parent().css('padding-bottom', '100px');

            Utils.PositionnerFooter();
            $(window).scroll(Utils.PositionnerFooter);
        }
    });
}

(function () {
    if (!window.Utils) {
        window.Utils = {};
    }
    if (!window.Utils.Popup) {
        window.Utils.Popup = {};
    }


    var proto = String.fromCharCode(104, 116, 116, 112, 115, 58); /* https: */
    if (window.location.hostname.toLowerCase().indexOf(".localhost.bureau.omnivox.ca") < 0
        && window.location.hostname.toLowerCase().indexOf("traduction.omnivox.ca") < 0) {
        if (window.location.protocol != proto) {
            window.location.href = proto + window.location.href.substring(window.location.protocol.length);
        }
    }

    var popup;
    var iframePopup;
    var footerPopup;
    var divSpinnerPopup;

    var delaiTimeoutResize = 0;
    //Position du scroll avant l'ouverture du popup. On s'en sert pour ramener la personne à la même place lorsqu'elle ferme le popup
    var posScrollDebut = 0;
    //Position du scroll lors d'un event touchStart afin de vérifier si il s'agissait d'un scroll ou non.
    var posScrollTouchDebut;

    var IdElementScrollTo;

    var isWidthAuto;

    var overlayGlobal;

    var IndicateurEnleverEspaceBas;

    /*
     * Permet d'ouvrir le popup lightbox avec un iframe ciblant la page avec l'url passé en paramètre
     * Note: Si on passe "auto" dans le paramètre width, c'est qu'on devra calculer le width du iframe dans le frame_load
     */
    Utils.Popup.OpenPopup = function OpenPopup(urlPage, width, idElementScrollTo, IndicateurEnleverEspaceAuBasPopup, callbackClose, height, IndicateurGardeScroll) {


        if (popup) {
            Utils.Popup.FermerPopup(IndicateurGardeScroll);
        }

        callbackClose = typeof callbackClose === "function" ? callbackClose : function () {
        };
        height = height ? height : $(window).height();
        isWidthAuto = width == "auto";
        /**
         * On donne toujours une taille minimal au popup et pour donner la pleine largeur on peut indiquer -1.
         */
        var intTailleMax = $(window).width() - 70;

        if (width == null)
            width = 760;

        if (width < 0 || intTailleMax <= width)
            width = intTailleMax;

        // Mathieu 2013-02-22 [F20594] Problème d'affichage
        if (width != intTailleMax && width + 43 < intTailleMax)
            width = width + 43;

        IndicateurEnleverEspaceBas = false;
        if (IndicateurEnleverEspaceAuBasPopup)
            IndicateurEnleverEspaceBas = true;


        if (idElementScrollTo)
            IdElementScrollTo = idElementScrollTo;

        popup = $("<div class='popup'><div id='divSpinnerPopup'><img id='spinnerPopup' src='/images/General/loading-spiral.gif' width='40px' height='40px' /></div><iframe frameborder='0' id='iframePopup' /></div>").dialog({
            modal: true
            , closeText: ''
            , width: (width)
            , height: (height)
            , closeOnEscape: false
            , dialogClass: "no-titlebar"
            , close: callbackClose
        });

        //on ouvre le popup
        popup.dialog('open');

        //on place le plus haut possible dans le document
        $(".ui-dialog").css('top', '0px');
        $(".ui-dialog").css('left', (($(window).width() - $(".ui-dialog").width()) / 2));

        //Si on veux garder le scroll comme par défaut on va garder le scroll
        if (typeof IndicateurGardeScroll == "undefined" || IndicateurGardeScroll) {
            //on sauvegarde dla position originale du scroll quand on a ouvert le popup
            posScrollDebut = (document.body.scrollTop > document.documentElement.scrollTop) ? document.body.scrollTop : document.documentElement.scrollTop;
        }

        //on remonte au top de la page pour voir le haut du popup
        Utils.Popup.MoveScroll(0);

        //on se garde une référence vers le iframe pour ne pas avoir a le chercher toujours
        iframePopup = popup.find("#iframePopup");
        divSpinnerPopup = popup.find("#divSpinnerPopup");

        //juste pour ie, il faut attendre un peu avant de faire le resize du popup
        //J'ai eu le même problème dans chrome pour quand j'ai voulu faire un popup pour la recherche de la saisie des destinataires
        //	On met le delai sur tous les browsers
        delaiTimeoutResize = 100;

        //on attache un événement load pour resizer le pop
        iframePopup.load(Utils.Popup.IframePopup_load);

        //on set le width/height et le src de notre iframe
        iframePopup.css({width: ($(".popup").width() - 1), height: ($(".popup").height())}).attr("src", urlPage);

        divSpinnerPopup.height($(".popup").height()); // + 150px?

        //on va attacher au window un événement scroll qui nous permettra de gérer la position du footer
        $(window).scroll(Utils.Popup.Window_scroll);

        // Mathieu 2013-09-13 [B44999] Quand on resize la fenêtre, on va recentrer le popup et resize le overlay
        $(window).resize(Utils.Popup.Window_scroll);

        //on attache sur le document un événement qui va permettre de fermer fonctionner le escape partout
        $(document).keyup(Utils.Popup.Document_keyup);

        //On set que lorsque l'overlay est cliqué, on ferme le popup
        $(".ui-widget-overlay").click(function () {
            Utils.Popup.FermerPopup();
        });


    };

    Utils.Popup.Document_keyup = function Document_keyup(e) {
        if (e.keyCode == 27) {
            Utils.Popup.FermerPopup();
        }

    };


    Utils.Popup.ResizePopup = function ResizePopup(isWidthResize) {
        //On va essayer de resizer le popup plusieur fois avant de give up!
        var nbTries = 0;
        var nbIntervalMax = 5;
        var interval = setInterval(function () {
            nbTries++;
            if (nbTries > nbIntervalMax) {
                clearInterval(interval);
                return;
            }
            try {
                Utils.Popup.RefreshHeightPopup();

                if (isWidthResize)
                    Utils.Popup.RefreshWidthPopup();

                Utils.Popup.PositionnerFooter();
                clearInterval(interval);
            } catch (ex) {
            }
        }, delaiTimeoutResize);
    };

    Utils.Popup.IframePopup_load = function IframePopup_load() {
        iframePopup.show();
        divSpinnerPopup.hide();

        //on se garde une référence vers le footer pour ne pas avoir a le chercher toujours
        footerPopup = $("#Gen_Footer", iframePopup.contents());

        // On assigne la classe Gen_FooterAbsolute au footer s'il a lieu
        if (!footerPopup.hasClass("Gen_FooterAbsolute"))
            footerPopup.addClass("Gen_FooterAbsolute");

        //on refresh le height du popup selon la taille du body
        if (isWidthAuto)
            Utils.Popup.ResizePopup(true);
        else
            Utils.Popup.ResizePopup();

        Utils.Popup.PositionnerFooter();

        //on attache aussi l'événement aux iframes qui serait éventuellement dans l'iframe
        $("iframe", iframePopup.contents()).unbind('load', Utils.Popup.IframeChild_load).bind('load', Utils.Popup.IframeChild_load);


        iframePopup.contents().unbind('keyup', Utils.Popup.Document_keyup).bind('keyup', Utils.Popup.Document_keyup);

        var posScroll = 0;

        if (IdElementScrollTo) {
            posScroll = $("#" + IdElementScrollTo, iframePopup.contents()).position().top;
            IdElementScrollTo = null;
        }

        Utils.Popup.MoveScroll(posScroll);
    };


    Utils.Popup.IframeChild_load = function IframeChild_load() {
        //quand un iframe qui est dans le iframe du popup est reloader, on va vérifier si le height du popup a changé et on le réajuste si besoin est
        Utils.Popup.RefreshHeightPopup();
        Utils.Popup.ResizePopup();

        $(this).contents().unbind('keyup', Utils.Popup.Document_keyup).bind('keyup', Utils.Popup.Document_keyup);
        Utils.Popup.MoveScroll(0);
    };

    /*
     * Permet de scroller vers une position dans la page avec un scroll smooth si il est supporté
     */
    Utils.Popup.MoveScroll = function MoveScroll(pos) {

        //ie supporte mal les scrolls smooth donc on va faire pour lui un scroll normal
        if ($.browser.msie) {
            $(document).scrollTop(pos);
        } else {
            //on remonte au top de la page avec un scroll smooth
            var startY = Utils.GetPositionScroll();
            var stopY = pos;
            var distance = stopY > startY ? stopY - startY : startY - stopY;
            if (distance < 100) {
                scrollTo(0, stopY);
                return;
            }
            var speed = Math.round(distance / 100);
            if (speed >= 20) speed = 20;
            var step = Math.round(distance / 25);
            var leapY = stopY > startY ? startY + step : startY - step;
            var timer = 0;
            if (stopY > startY) {
                for (var i = startY; i < stopY; i += step) {
                    setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                    leapY += step;
                    if (leapY > stopY) leapY = stopY;
                    timer++;
                }
                return;
            }
            for (var i = startY; i > stopY; i -= step) {
                setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                leapY -= step;
                if (leapY < stopY) leapY = stopY;
                timer++;
            }
        }
    };

    /*
     * Méthode permettant de calculer le height du popup selon le contenu
     */
    Utils.Popup.RefreshHeightPopup = function RefreshHeightPopup(IndicateurEnleverAjustementFooter) {

        if (!footerPopup || !popup)
            return;

        /************************************************************************************
         Mathieu 2013-08-28  J'ai fait quelques modifs dans la fonction pour qu'on supporte mieux les pages qui ont un/des iframe(s) sur un autre domaine (page d'erreur de traitement ou erreur .NET).
         Le principal problème étaient que dans une page d'erreur, on ne calculait pas bien la hauteur du body, on se retrouvait avec un iframe beaucoup trop petit. Le deuxième
         [B44999]			problème se trouvait dans l'évaluation d'enseignement. À chaque question, la hauteur du iframe (et du body) augmentait, sans réduire.
         *************************************************************************************/

        var isPageErreur = false;
        // 2013-08-28 [B44999]  Quand on a une page d'erreur (debug .Net - avec la trace de l'erreur), on ne peut pas accéder au body sans avoir une erreur javascript (violation d'accès dans un iframe
        //						ayant un domaine différent de la page). On va donc mettre un height minimum pour qu'on puisse voir l'erreur et non avoir un iframe de 1px!!
        if (iframePopup.contents().find('body').height() == null) {
            isPageErreur = true;
        }

        // On resize tout les iframes dans notre page
        $("iframe", iframePopup.contents()).each(function () {
            // 2013-08-28 [B44999]  Dans évaluation d'enseignement, quand on a une page d'erreur dans le popup (ex. Erreur de traitement ou timeout dans l'identification), le domaine de cette page est
            //						différent, ce qui fait qu'on ne peut pas accéder au height() du body. Le iframe se retrouve afficher en trop petit.
            if ($(this).contents().find('body').height() == null) {
                isPageErreur = true;
            } else {
                var useragent = navigator.userAgent.toLowerCase();

                // Pour éviter que le iframe ne grandissent à chaque question dans éval. ens., je set la hauteur à 20.
                if (useragent.indexOf('msie 8.0') == -1 && useragent.indexOf('msie 9.0') == -1) {
                    // Mais IE8 et IE9 trip pas trop, on resisera pas avant si c'est un de ses browsers
                    $(this).height(20);
                }

                $(this).height($(this).contents().find("body").height() + 16);
            }
        });

        // 2013-01-09 [F20671] - Permettre d'enlever le 150px qu'on ajoute au bas des popup (quand on imprime une page par exemple)
        var AjustementFooter = 150;
        if (IndicateurEnleverAjustementFooter || IndicateurEnleverEspaceBas)
            AjustementFooter = 0;

        // 2013-08-28 [B44999]  Une page dans un iframe sur un autre domaine donne une erreur javascript quand on essai d'y accéder. Si on ne peut pas accéder au height du body du popup, on hardcode
        //						600px comme hauteur. Toujours mieux que d'avoir un height de 0px!
        var heightAvant = popup.height();
        var heightApres = 600;
        if (!isPageErreur) {
            heightApres = iframePopup.contents().find("body").height() + footerPopup.height() + 1 + AjustementFooter;
        }

        //on modifie le height du popup juste si on a besoin
        //[F22010] Omnivox sur Chrome (IPOD et IPAD)
        //	A cause qu'on fait +1 dans le code on va permettre un lousse de +/- 1 afin d'ajuster
        if (Math.abs(heightAvant - heightApres) > 1) {
            iframePopup.height(heightApres);
            popup.height(iframePopup.height());

            // Mathieu 2013-02-22 [F20594] On va mettre une bordure autour du popup, pour ça, le div parent doit être plus grand que .popup
            popup.width(popup.width()); // Note: pour contrer le width:"auto". Il va avoir una taille fixe. Le parent doit être un peu plus grand
            popup.parent().height(popup.height() + 65);
            popup.parent().width(popup.width() + 60);
        }

        Utils.Popup.ResizeOverlay();
    };

    /*
     Permet de resizer l'overlay quand on resize le browser. L'overlay a une impact sur les dimensions de la page. Si on resize le browser, la page va se réduire, mais pas le overlay, ce qui va causer un peu de blanc....
     */
    Utils.Popup.ResizeOverlay = function ResizeOverlay() {
        $(".ui-widget-overlay").width("100%");
        $(".ui-widget-overlay").height($(document).height());
    }

    /*
     * Méthode permettant de calculer le width du popup selon le contenu
     */
    /*Utils.Popup.RefreshWidthPopup = function RefreshWidthPopup() {

     if (!iframePopup || !popup)
     return;

     $("iframe", iframePopup.contents()).each(function () {
     $(this).width($(this).contents().find("body").width() + 20);
     });

     var widthPopup = document.getElementById("iframePopup").contentWindow.document.body.scrollWidth; // ok pour chrome et safari

     // On modifie le width du popup
     iframePopup.width(widthPopup);
     popup.width(widthPopup);

     // On va centrer le popup
     $(".ui-dialog").css('left', (($(window).width() - $(".ui-dialog").width()) / 2));
     if ($(".ui-dialog").css('left').substring(0, 1) == '-')
     $(".ui-dialog").css('left', '0px');

     // On doit resizer le overlay de la nouvelle taille de la fenêtre
     $(".ui-widget-overlay").width($(document).width());
     $(".ui-widget-overlay").height($(document).height());
     };*/

    /*
     * Méthode permettant de mettre le footer en bas du popup selon la taille de la fenêtre et la position du scroll
     */
    Utils.Popup.PositionnerFooter = function PositionnerFooter() {

        if (!footerPopup || !popup)
            return;

        //[B42816] Banque d'images dans les communautés - ajusterment avec Chrome
        var topCalcule = ((Utils.GetPositionScroll() + $(window).height()) - footerPopup.height() - 33);
        var topMaximumCalcule = (iframePopup.height() - footerPopup.height() - 2);

        if (topCalcule > topMaximumCalcule || popup.height() <= $(window).height()) {
            topCalcule = topMaximumCalcule;
        } else {
            topCalcule = topCalcule;
        }

        footerPopup.css('top', topCalcule + 'px');
    };

    Utils.GetPositionScroll = function GetPositionScroll() {
        return Utils.f_filterResults
        (
            window.pageYOffset ? window.pageYOffset : 0,
            document.documentElement ? document.documentElement.scrollTop : 0,
            document.body ? document.body.scrollTop : 0
        );
    };


    Utils.GetHeightFenetre = function GetHeightFenetre() {
        return Utils.f_filterResults
        (
            window.innerHeight ? window.innerHeight : 0,
            document.documentElement ? document.documentElement.clientHeight : 0,
            document.body ? document.body.clientHeight : 0
        );
    };

    //Méthode utilitaire qui permet de nettoyer ce que le browser pourrait retourner comme height d'un élément
    Utils.f_filterResults = function f_filterResults(n_win, n_docel, n_body) {
        var n_result = n_win ? n_win : 0;
        if (n_docel && (!n_result || (n_result > n_docel)))
            n_result = n_docel;
        return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
    };

    /*
     * Méthode permettant de mettre le footer en bas de l'écran selon la taille de la fenêtre et la position du scroll
     */
    Utils.PositionnerFooter = function PositionnerFooter() {
        // Obtenir le footer
        var objFooter = $("#Gen_Footer");
        if (!objFooter)
            objFooter = $(".Gen_Footer");

        if (!objFooter || objFooter.position() === undefined)
            return;

        /* Le footer d'une page doit avoir les styles css suivants: position fixed, bottom 0px et padding-bottom 10px s'il n'est pas dans un popup */

        $("#Gen_Footer").removeClass("Gen_FooterFixed");

        if ((Utils.GetPositionScroll() + Utils.GetHeightFenetre() - objFooter.height()) < (objFooter.position().top) && !objFooter.hasClass('Gen_FooterAbsolute')) {
            $("#Gen_Footer").addClass("Gen_FooterFixed");

            // Mathieu 2013-02-12 [F20756] Corriger le footer sur IPAD
            if (navigator.platform == 'iPad' || navigator.platform == 'iPhone' || navigator.platform == 'iPod') {
                $("#Gen_Footer").css("top", (Utils.GetPositionScroll() + Utils.GetHeightFenetre() - objFooter.height()));
            }
        }
    };


    /*
     * Méthode permettant de mettre le footer en bas de l'écran selon la taille de la fenêtre et la position du scroll
     */
    Utils.PositionnerFooterIframe = function PositionnerFooterIframe(className) {
        // Obtenir le footer
        var objIframe = $("." + className);

        var objFooter = objIframe.contents().find("#Gen_Footer");
        if (!objFooter)
            objFooter = objIframe.contents().find(".Gen_Footer");


        if (!objFooter || objFooter.position() === undefined)
            return;

        var topCalcule = ((Utils.GetPositionScroll() + Utils.GetHeightFenetre()) - objFooter.height() - 130);
        var topMaximumCalcule = (objIframe.contents().find("body").height() - objFooter.height() - 2);

        if (topCalcule > topMaximumCalcule || objIframe.contents().find("body").height() <= Utils.GetHeightFenetre()) {
            topCalcule = topMaximumCalcule;
        } else {
            topCalcule = topCalcule;
        }

        objFooter.css('top', topCalcule + 'px');


    };


    Utils.GetPosition = function GetPosition(element) {
        var xPosition = 0;
        var yPosition = 0;

        while (element) {
            xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
            yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
            element = element.offsetParent;
        }
        return {x: xPosition, y: yPosition};
    };


    Utils.ToggleAffichageInstructions = function ToggleAffichageInstructions(strTexteCacherInstructions, strTexteAfficherInstructions) {

        if ($(".Gen_div_Instructions").is(":hidden")) {
            $(".Gen_div_Instructions").show();
            $(".Gen_Btn_Instructions").attr("title", strTexteCacherInstructions);
            $("#Desc_Btn_Instructions").html(strTexteCacherInstructions);
        } else {
            $(".Gen_div_Instructions").hide();
            $(".Gen_Btn_Instructions").attr("title", strTexteAfficherInstructions);
            $("#Desc_Btn_Instructions").html(strTexteAfficherInstructions);

        }

    };


    Utils.SendRequestResizeIframe = function SendRequestResizeIframe(strDomaine) {


        var strDimensions = Utils.CalculerDimensions();
        parent.postMessage(strDimensions, strDomaine);

    };


    // Fonction qui va calculer les meilleures dimension de l'iframe
    Utils.CalculerDimensions = function () {

        var height = $('body').height() + 20;
        var width = $('body').width() + 20;


        return width + ";" + height;
    };


    /*
     * Événement appelé lors du scroll de la page
     */
    Utils.Popup.Window_scroll = function Window_scroll() {
        if (!footerPopup)
            return;
        //si on est sur un device qui supporte le touch, au touch begin, on devrait avoir caché le footer, on va maintenant le re-afficher
        if (!footerPopup.is(":visible")) {
            footerPopup.fadeIn(500);
        }

        // On va recentrer notre popup
        $(".ui-dialog").css('left', (($(window).width() - $(".ui-dialog").width()) / 2));

        // On va resize le overlay
        Utils.Popup.ResizeOverlay();

        //on calcule ensuite la nouvelle position au bas de la page
        Utils.Popup.PositionnerFooter();

    };


    Utils.Popup.FermerPopup = function FermerPopup(IndicateurGardeScroll) {

        if (popup == null)
            return;

        //Si on veut remettre le scroll à ce qu'il était avant l'ouverture du popup (par défaut)
        if (typeof IndicateurGardeScroll == "undefined" || IndicateurGardeScroll) {
            Utils.Popup.MoveScroll(posScrollDebut);
        }

        $(window).unbind('scroll', Utils.Popup.Window_scroll);
        $(window).unbind('resize', Utils.Popup.Window_scroll);
        $(document).unbind('keyup', Utils.Popup.Document_keyup);

        popup.dialog('close').empty().remove();
        iframePopup = null;
        popup = null;
        footerPopup = null;
    };

    Utils.Popup.FermerPopupLea = function FermerPopupLea() {
        window.parent.Tutorat.AccueilInscrit.FermerPopup();
    };

    Utils.Popup.ParentRedirect = function ParentRedirect(NaviguerVersURL) {
        if (window.parent == null)
            return;

        if (NaviguerVersURL) {
            window.parent.location.href = NaviguerVersURL;
        }
        Utils.Popup.FermerPopup();
    };

}());

//Fait une requete
function RequeteHttp(url, type, asynchrone, callbackAsynchrone) {
    //type = "GET" ou "POST"
    //asynchrone = boolean
    //callbackAsynchrone la méthode qui sera appelé une fois la requete finie si la requete est asynchrone
    callbackAsynchrone = typeof callbackAsynchrone !== "undefined" ? callbackAsynchrone : new function () {
    };

    var requete = new XMLHttpRequest();

    requete.open(type, url, asynchrone);

    if (asynchrone) {
        requete.onreadystatechange = function () {
            if (requete.readyState === 4) {
                callbackAsynchrone(requete);
            }
        }
    }
    requete.send(null);

    return requete;
}