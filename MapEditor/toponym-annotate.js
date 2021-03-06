"use strict"

var SpansObject;

var placeApplier;
var placeUnapplier;
var placeApplierGeo;
var placeUnapplierGeo;

var personApplier;
var personUnapplier;
var personUnapplierGeo;

var orgApplier;
var orgUnapplier;
var orgUnapplierGeo;



var placeClass = "place"
var personClass = "person"
var orgClass = "org"
var annotationClasses = [placeClass, personClass, orgClass]

function addPlace() {
    addFeature(placeClass, placeApplier, annotationClasses)
}

function addPerson() {
    addFeature(personClass, personApplier, annotationClasses)
}

function addOrg() {
    addFeature(orgClass, orgApplier, annotationClasses)
}

function applyGeoAll(){
    var current_geom = getMapFeatures()
    //get the node of the current selection
    var textnode = getTextNode()
    var selectionRange = getSelectionRange(textnode)
    var nodes = getRangeNodes(selectionRange, ["place"])
    if (nodes.length == 1){
        var text = nodes[0].textContent.toLowerCase()
        var place_nodes = getRangeNodes(makeRange(textnode), ["place"])
        var places = 0
        for (var i = 0; i < place_nodes.length; i++) {
            var pnode = place_nodes[i]
            if (pnode.textContent.toLowerCase() == text){
                places++;
                setStoredMapFeatures(pnode, current_geom, true)
            }
        }
        logMessage("Applied Geometry to " + places + " occurences of " + "'" + text + "'")
    } else {
        logMessage("Selection does not contain a place")
    }
        
}

function init() {
    commonMapInit()

    SpansObject = Parse.Object.extend("NESpans");

    placeApplier = rangy.createClassApplier(placeClass, {
        elementAttributes: {onclick:"spanClick(this)"},
        normalize: false
    });
    placeApplierGeo = rangy.createClassApplier(placeClass, {
        elementAttributes: {onclick:"spanClick(this)", geo:"1"},
        normalize: false
    });

    placeUnapplierGeo = rangy.createClassApplier(placeClass, {
        elementAttributes: {onclick:"spanClick(this)", geo:"1"},
        normalize: true
    });

    placeUnapplier = rangy.createClassApplier(placeClass, {
        elementAttributes: {onclick:"spanClick(this)"},
        normalize: true
    });

    personApplier = rangy.createClassApplier(personClass, {
        elementAttributes: {onclick:"spanClick(this)"},
        normalize: false
    });
    personUnapplier = rangy.createClassApplier(personClass, {
        elementAttributes: {onclick:"spanClick(this)"},
        normalize: true
    });

    personUnapplierGeo = rangy.createClassApplier(personClass, {
        elementAttributes: {onclick:"spanClick(this)", geo:"1"},
        normalize: true
    });

    orgApplier = rangy.createClassApplier(orgClass, {
        elementAttributes: {onclick:"spanClick(this)"},
        normalize: false
    });
    orgUnapplier = rangy.createClassApplier(orgClass, {
        elementAttributes: {onclick:"spanClick(this)"},
        normalize: true
    });
    orgUnapplierGeo = rangy.createClassApplier(orgClass, {
        elementAttributes: {onclick:"spanClick(this)", geo:"1"},
        normalize: true
    });

    annotationClassesAndAppliers = [
        {clazz: placeClass, applier: placeApplier, geoapplier:placeApplierGeo, geounapplier: placeUnapplierGeo, unapplier: placeUnapplier},
        {clazz: personClass, applier: personApplier, unapplier: personUnapplier, geounapplier: personUnapplierGeo},
        {clazz: orgClass, applier: orgApplier, unapplier: orgUnapplier, geounapplier: orgUnapplierGeo}
    ]

    keyCodeActions = [
        {code: 65, action: addPlace},
        {code: 69, action: addPerson},
        {code: 79, action: addOrg},
        {code: 82, action: removeAnnotation}
    ]
}

// Set 4-space indentation for vi
// vi:sw=4
