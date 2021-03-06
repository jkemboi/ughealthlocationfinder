/*!
 * Customization file for Fusion Table Mobile Templates
 * See maps_lib.js for license and repository
 *
 * REPLACE THE SETTINGS BELOW TO REFER TO YOUR OWN DATA.
 * COLUMN NAMES ARE CASE-SENSITIVE!
 *
 * Required:
 * 1. Fusion Table IDs
 *
 * Overrides (optional):
 * 2. Search Settings
 *     - Default is a field for every column if you don't set this
 * 3. Custom Content
 *     - Title
 *     - About Page
 *     - Infobox (popup when you click on a location)
 * 4. Map Preferences
 *     - How It Should Use Your Nearby Location
 */

var MapsLib = MapsLib || {}; MapsLib.schemaVersion = 2;


    /////////////////////////
    // 1. FUSION TABLE IDs //
    /////////////////////////

    // Using v1 Fusion Tables API
    // See https://developers.google.com/fusiontables/docs/v1/migration_guide for more info

    // The encrypted Table ID of your Fusion Table (found under File => About)
    MapsLib.fusionTableId = "1euHNAy9kG1LMiPuvTjgJjOc25qOqIWmYVCCoZEnD";

    // *New Fusion Tables Requirement* API key. found at https://code.google.com/apis/console/
    // *Important* this key is for demonstration purposes. please register your own.
    MapsLib.googleApiKey ="AIzaSyCH4tXE8IzFXJMJJbPyszK8FzhRt2ewyxc";
    

    // DONE!  YOU COULD DELETE EVERYTHING AFTER THIS POINT AND STILL HAVE A WORKING APP.
    // BELOW ARE CUSTOM OVERRIDES TO MAKE YOUR APP MORE AWESOME.  UNCOMMENT EACH SECTION AS YOU GO.

    // IF YOU GET STUCK, PLEASE VISIT https://github.com/sfbrigade/Mobile-Fusion-Tables
    // YOU CAN SUBMIT AN ISSUE OR CONTACT AN AUTHOR.



$.extend(MapsLib, {

    ////////////////////////
    // 2. SEARCH SETTINGS //
    ////////////////////////

    // By default, you will get a text or range field for each column in your table.
    // However, you can customize search settings using the following attributes:
    //
    //  - allColumns (default=true):             a text field will appear for each column.
    //
    //  - allColumnsExactMatch (default=false):  allColumns + exact matching of fields.
    //
    //  - addressShow (default=true):            show address field for centering search
    //
    //  - addressAutocomplete:                   autocomplete options for address field (set to false if you don't want autocomplete)
    //     - country (default="US"):             restrict autocomplete to search within said country (2-character country code)
    //     - useDefaultMapBounds (default=true): addresses within defaultMapBounds (see section 4) will be prioritized to the top of autocomplete results
    // 
    //  - distanceFilter: drop-down for restricting search results by distance to address (or nearby).  Comment this out to have no such drop-down.
    //     - filterSearchResults (default=true): limit search results to those within distance
    //     - filterListResults (default=true):   limit list results to those within distance (otherwise they're just ordered nearest-first)
    //     - entries:                            array of drop-down entries for distance from address.  Each entry is an array of:
    //          1. drop-down text
    //          2. radius length as "X miles" or "X meters" if the drop-down text wasn't already in this format.
    //          3. true if this is the default selection
    //       - You can specify "0" for radius length to not filter by distance, and leave zoom as-is.
    //
    //
    //  - columns: array of search fields.  Each field has a type, and additional attributes that depend on the type:
    //
    //      type: "text"
    //       - label
    //       - column: name of column
    //       - exact_match (default=false): look for exact match instead of a contains match
    //
    //      type: "datepicker"
    //       - label
    //       - column: name of column
    //       - min (default = earliest date if column is datetime, "" means no min bounds): disable dates before this
    //       - max (default = latest date if column is datetime, "" means no max bounds): disable dates after this
    //       - format (default = "mm/dd/yy"): useful if you're using a text column for this
    //
    //      type: "slider" (default for numbers and dates, won't work for text columns, pops up datepicker for datetime columns)
    //       - label
    //       - column: name of column
    //       - min (default = min value): override min value
    //       - max (default = max value): override max value
    //
    //      type: "checkbox"
    //       - label
    //       - is_checked (default = false): start out as checked
    //       - unchecked_query: filter to this Fusion Table SQL-style WHERE clause when unchecked
    //       - checked_query: filter to this Fusion Table SQL-style WHERE clause when checked
    //
    //      type: "dropdown"
    //       - label
    //       - entries: array of drop-down entries.  Each entry is an array of:
    //          1. drop-down text
    //          2. Fusion Table SQL-style WHERE clause (overrides template)
    //             - see https://developers.google.com/fusiontables/docs/v1/sql-reference for Fusion Table-friendly WHERE clauses
    //          3. true if this is the default selection
    //       - template (optional): template for WHERE clause, using {text} to insert drop-down text
    //          NOTE: if you use a template, a drop-down entry can be just the drop-down text instead of an array.
    //       - foreach (optional): populates drop-down with an entry for each unique value of the specified column
    //          NOTE: if you use foreach, you can still add entries under options (they will appear at the top of the dropdown).
    //
    //  If "allColumns" is true, "text" and "slider" columns will simply override label/match settings for the specified columns
    //  Text fields for numerical columns use exact match only.  (If you want range categories, create a drop-down)

    searchPage: { 
        allColumns: false,
        distanceFilter: { 
		entries: [ ["Anywhere", "0", true], ["1/2 Km","0.3 miles",], ["1 Km","0.6 miles",],["2 Km","1.24 miles",], ["5 Km","3.1 miles",], ["10 Km","6.2 miles",],["20 Km","12.4 miles",] ]
        },
        columns: [
            { label: "Type of Facility", type: "dropdown", foreach: "Facilitytype",
                entries: [
                    ["Any", "", true],
                ],
             },
            { label: "Facility Name", type: "text", column: "Name" }
        ]
    },


    ///////////////////////
    // 3. CUSTOM CONTENT //
    ///////////////////////

    // Title bar (including title of website)
    title: "U.G. County Health Facilities",

    // Contents of the About Page.  You can use "{title}" to insert your title.
    aboutPage: " \
        <h3>About {title}</h3> \
        <p>This is a healthcare facility locator application for Uasin Gishu County in Kenya.    Developed by John Kemboi for Uasin Gishu County, it's an adaptation of Derek Eder's searchable Fusion Table, licensed under the <a href='https://github.com/derekeder/FusionTable-Map-Template/wiki/License' target='_blank'>MIT License</a>.    This particular application uses Kenya health Master facililty listing data for all healthcare facilities in Kenya.</p>\
        <p>.</p> \
        ",

    // If you already customized your marker styles and infoboxes within the Fusion Table,
    // you can use them by setting the style and template IDs here.
    // (You can find your IDs inside the link generated by the 'Publish' option in Fusion Tables.)
    // (for more details, see https://developers.google.com/fusiontables/docs/v1/using#WorkingStyles)
    //styleId: 2,
    //templateId: 3,
    
    // This will go in your style block.  Useful if customizing your infoboxes.
    customCSS: " \
        .infobox-header, .ui-li-desc, #entity-text { font-family: Arial, Helvetica, Geneva, sans-serif; white-space:normal;} \
        .infobox-subheader { padding-top: 5px; } \
        .infobox-map { width:220px; } \
        .infobox-header { display:inline; padding-right: 10px; } \
        .moreinfo { margin-left:7px; min-width:18px; position:absolute; \
                top:45%; bottom:45%; min-height:18px; } \
        .entity { float:left; font-size:medium; padding:5px; border:1px solid blue; margin:2px 7px 5px 0px; } \
        .entity.blue_box { display: none; background-color: #0060ed; color: white; } \
        .entity.red_box { display: none; background-color: #fb6155; color: white; } \
        .entity.orange_box { background-color: #ff9c00; color: white; } \
        .entity.blue_box.Government { display: inherit; } \
        .entity.red_box.Corporate { display: inherit; } \
        .entity.orange_box.Government { display: none; } \
        .entity.orange_box.Corporate { display: none; } \
    ",

    // customInfoboxHtml can be defined as a string or a function:
    //    STRING:    You can embed Handlebars expressions and variables.
    //    FUNCTION:  Returns an HTML string and takes two params: row and isListView
    //    "":        No infobox.
    //    Default (leaving it undefined): falls back on the infobox format from Fusion Table
    //
    //    In either case, the variables are defined as follows:
    //    - row.COLUMN_NAME, returns value for given column in your FusionTable row
    //        - Note: COLUMN_NAME has periods omitted, and spaces replaced with underscores
    //        - Example: to get the value from the "U.S. Entity Type" column, use row.US_Entity_Type
    //    - isListView, which evaluates to:
    //        - false when populating a map infobox
    //        - true when populating a row in the "List" view

    // delimitedColumns (optional): specify delimiter per column, and row.COLUMN_NAME will return an array
    //delimitedColumns: {"Resources": ";"},
    
    // listViewSortByColumn (optional): specify column to sort by, instead of sorting by distance
    //                                  append "DESC" to sort in reverse
    //listViewSortByColumn: "Name",

    customInfoboxHtml: ' \
        {{#if isListView}} \
            <div> \
        {{else}} \
            <div class="infobox-map"> \
        {{/if}} \
        <div class="entity blue_box {{row.Facilitytype}}"><span id="entity-text">.gov</span></div> \
        <div class="entity red_box {{row.Facilitytype}}"><span id="entity-text">.com</span></div> \
        <div class="entity orange_box {{row.Facilitytype}}"><span id="entity-text">.Hsp</span></div> \
        <h4 class="infobox-header">{{row.Name}}</h4> \
        {{#if isListView}} \
            <p class="ui-li-desc infobox-subheader"> \
            {{row.Facilitytype}}<br> \
            {{row.OfficialAddress}}</p> \
			{{row.OfficialMobile}}</p> \
        {{else}} \
            <p></p><p class="ui-li-desc"> \
            {{row.Facilitytype}}<br> \
			{{row.Owner}}<br> \
			{{row.Operationstatus}}<br> \
            {{row.OfficialAddress}}<br> \
            {{#if row.coordinates}} \
                <a href="google.navigation:q={{row.coordinates}}" target="_blank">Navigate</button></a><br> \
            {{/if}} \
            <a href="tel:1{{row.OfficialMobile}}">{{row.OfficialMobile}}</a></p> \
        {{/if}} \
        </p></div>',
                    
    // <a class="btn" href="google.navigation:q={{row.coordinates}}" target="_blank"><i class="material-icons">&#xe569;</i></button></a><br> \
	// Infoboxes will also appear (unless blank) on your nearby or search address pins.
    // HTML is OK.  Use "{address}" to denote the entered address for addressPinInfobox.
    nearbyPinInfobox: "You are here.",
    addressPinInfobox: "{address}",


    ////////////////////////
    // 4. MAP PREFERENCES //
    ////////////////////////

    // Override the location column in your Fusion Table (useful if you have multiple columns)
    // NOTE: if you have "latitude" and "longitude" columns, just use "latitude"
    //locationColumn:  "Address",
    
    // Bounds and center that your map defaults to when location services are off.
    // If useDefaultMapBounds is true (see section 2), this also determines which addresses get priority with autocomplete
    defaultMapBounds: {

        // Use [latitude, longitude] or address
        center: "0.511587,35.282755",

        // "X miles" or "X meters"
        radius: "5 miles"
    },

    // Set useNearbyLocation to false if you don't want to get the user's location.
    useNearbyLocation: {
        startAtNearbyLocation:      true,

        // If true: use nearby location only if we're within default map bounds
        //          otherwise, post boundsExceededMessage (if non-empty) and use mapDefaultCenter.
        onlyWithinDefaultMapBounds: true,
        boundsExceededMessage:      "You're currently outside Uasin Gishu County region.    Defaulting to geographical center.",

        // use this zoom radius if starting at nearby location
        nearbyZoomRadius:           "15 miles",

        // Snap to nearby zoom radius when user hits "Nearby"?    Options are:
        // true              = always snap to zoom level
        // false (default)   = never snap to zoom level
        // int               = snap to zoom level if ratio between current and nearby zoom radii
        //                       is greater than this (in either direction)
        snapToNearbyZoomIfRatioGreaterThan: 8
    },

    // mapOverlays is an array of overlays, where each overlay can be either of the following:
    // A. a FusionTable ID
    // B. an entry with the following attributes (representing a "ground overlay"):
    //       - imageURL: url to the image to overlay on the map
    //       - cornerNW: [latitude, longitude] of the overlay's NW corner
    //       - cornerSE: [latitude, longitude] of the overlay's SE corner
    //       - opacityPercent (default = 50):
    //            0 = completely invisible
    //            100 = completely opaque

    // mapOverlays: []

    // If needed, you can change the visibility of these layers by calling this in script:
    //    MapsLib.setLayerVisibility([array of indices from bottom to top])
    // Examples: 
    //    MapsLib.setLayerVisibility([0,2]) will show only the first and third layers, and the third layer will be on top.
    //    MapsLib.setLayerVisibility([]) will hide all layers

});
