var DataSchema = require("dataschema");

var ecoSchema = [
    { name: "index",                type: "uint32" },
    { name: "name",                 type: "nullstring" },
    { name: "colorNxMap",           type: "nullstring" },
    { name: "specBlendNyMap",       type: "nullstring" },
    { name: "detailRepeat",         type: "uint32" },
    { name: "blendStrength",        type: "float" },
    { name: "specMin",              type: "float" },
    { name: "specMax",              type: "float" },
    { name: "specSmoothnessMin",    type: "float" },
    { name: "specSmoothnessMax",    type: "float" },
    { name: "physicsMaterial",      type: "nullstring" },
    { name: "layers",               type: "array", fields: [
        { name: "density",              type: "float" },
        { name: "minScale",             type: "float" },
        { name: "maxScale",             type: "float" },
        { name: "slopePeak",            type: "float" },
        { name: "slopeExtent",          type: "float" },
        { name: "minElevation",         type: "float" },
        { name: "maxElevation",         type: "float" },
        { name: "minAlpha",             type: "uint8" },
        { name: "flora",                type: "nullstring" },
        { name: "tints",                type: "array", fields: [
            { name: "color",                type: "rgba" },
            { name: "percentage",           type: "uint32" }
        ]}
    ]}
];



var floraSchema = [
    { name: "name",                 type: "nullstring" },
    { name: "texture",              type: "nullstring" },
    { name: "model",                type: "nullstring" },
    { name: "unknownBoolean1",      type: "boolean" },
    { name: "unknownFloat1",        type: "float" },
    { name: "unknownFloat2",        type: "float" },
    { name: "unknownFloat3",        type: "float" },
    { name: "unknownFloat4",        type: "float" },
    { name: "unknownFloat5",        type: "float" }
];

var floraSchemaPS2 = [
    { name: "name",                 type: "nullstring" },
    { name: "texture",              type: "nullstring" },
    { name: "model",                type: "nullstring" },
    { name: "unknownBoolean1",      type: "boolean" },
    { name: "unknownFloat1",        type: "float" },
    { name: "unknownFloat2",        type: "float" }
];

var invisibleWallSchema = [
    { name: "unknownUint32",        type: "uint32" },
    { name: "unknownFloat1",        type: "float" },
    { name: "unknownFloat2",        type: "float" },
    { name: "unknownFloat3",        type: "float" }
];

var objectSchema = [
    { name: "actorDefinition",      type: "nullstring" },
    { name: "renderDistance",       type: "float" },
    { name: "instances",            type: "array", fields: [
        { name: "position",             type: "floatvector4" },
        { name: "rotation",             type: "floatvector4" },
        { name: "scale",                type: "floatvector4" },
        { name: "id",                   type: "uint32" },
        { name: "unknownByte1",         type: "uint8" },
        { name: "unknownFloat1",        type: "float" }
    ]}
];

var lightSchema = [
    { name: "name",                 type: "nullstring" },
    { name: "colorName",            type: "nullstring" },
    { name: "type",                 type: "uint8" },
    { name: "unknownFloat1",        type: "float" },
    { name: "position",             type: "floatvector4" },
    { name: "rotation",             type: "floatvector4" },
    { name: "range",                type: "float" },
    { name: "innerRange",           type: "float" },
    { name: "color",                type: "argb" },
    { name: "unknownByte1",         type: "uint8" },
    { name: "unknownByte2",         type: "uint8" },
    { name: "unknownByte3",         type: "uint8" },
    { name: "unknownByte4",         type: "uint8" },
    { name: "unknownByte5",         type: "uint8" },
    { name: "unknownVector1",       type: "floatvector4" },
    { name: "unknownString1",       type: "nullstring" },
    { name: "id",                   type: "uint32" }
];


var decalSchema = [
    { name: "unknownFloat1",        type: "float" },
    { name: "position",             type: "floatvector4" },
    { name: "unknownFloat2",        type: "float" },
    { name: "unknownFloat3",        type: "float" },
    { name: "unknownFloat4",        type: "float" },
    { name: "unknownFloat5",        type: "float" },
    { name: "decimalDigits6And4",   type: "uint32" }, //I mean, uh, the last 4 digits in decimal seem to be similar or same for several values, thus probably have some significance
    { name: "name",                 type: "nullstring" },
    { name: "unknownFloat6",        type: "float" },
    { name: "unknownFloat7",        type: "float" },
    { name: "unknownFloat8",        type: "float" },
    { name: "unknownInt",           type: "uint32" }
];

var schema = [
    { name: "signature",            type: "uint32" },
    { name: "version",              type: "uint32" },
    { name: "unknown",              type: "uint32" },
    { name: "offsets",              type: "schema", fields: [
        { name: "ecos",                 type: "uint32" },
        { name: "floras",               type: "uint32" },
        { name: "invisibleWalls",       type: "uint32" },
        { name: "objects",              type: "uint32" },
        { name: "lights",               type: "uint32" },
        { name: "unknowns",             type: "uint32" },
        { name: "decals",               type: "uint32" }
    ]},
    { name: "quadsPerTile",         type: "uint32" },
    { name: "tileSize",             type: "float" },
    { name: "tileHeight",           type: "float" },
    { name: "vertsPerTile",         type: "uint32" },
    { name: "tilesPerChunk",        type: "uint32" },
    { name: "startX",               type: "int32" },
    { name: "startY",               type: "int32" },
    { name: "chunksX",              type: "uint32" },
    { name: "chunksY",              type: "uint32" },
    { name: "ecos",                 type: "array", fields: ecoSchema },
    { name: "floras",               type: "array", fields: floraSchema },
    { name: "invisibleWalls",       type: "array", fields: invisibleWallSchema },
    { name: "objects",              type: "array", fields: objectSchema },
    { name: "lights",               type: "array", fields: lightSchema },
    { name: "unknowns",             type: "array", fields: [] },
    { name: "decals",               type: "array", fields: decalSchema }

];

var schemaPS2 = [
    { name: "signature",            type: "uint32" },
    { name: "version",              type: "uint32" },
    { name: "offsets",              type: "schema", fields: [
        { name: "ecos",                 type: "uint32" },
        { name: "floras",               type: "uint32" },
        { name: "invisibleWalls",       type: "uint32" },
        { name: "objects",              type: "uint32" },
        { name: "lights",               type: "uint32" },
        { name: "unknowns",             type: "uint32" }
    ]},
    { name: "quadsPerTile",         type: "uint32" },
    { name: "tileSize",             type: "float" },
    { name: "tileHeight",           type: "float" },
    { name: "vertsPerTile",         type: "uint32" },
    { name: "tilesPerChunk",        type: "uint32" },
    { name: "startX",               type: "int32" },
    { name: "startY",               type: "int32" },
    { name: "chunksX",              type: "uint32" },
    { name: "chunksY",              type: "uint32" },
    { name: "ecos",                 type: "array", fields: ecoSchema },
    { name: "floras",               type: "array", fields: floraSchemaPS2 },
    { name: "invisibleWalls",       type: "array", fields: invisibleWallSchema },
    { name: "objects",              type: "array", fields: objectSchema },
    { name: "lights",               type: "array", fields: lightSchema },
    { name: "unknowns",             type: "array", fields: [] }

];


function readZone(data, offset) {
    offset = offset || 0;

    var signature = data.readUInt32LE(offset);
    if (signature != 0x454E4F5A) {
        throw "Not a valid zone file";
    }
    var version = data.readUInt32LE(offset+4);
    if (version == 0x00000001) {
        var zone = DataSchema.parse(schemaPS2, data, offset);
    }
    else {
        var zone = DataSchema.parse(schema, data, offset);
    }
    
    return zone.result;

}

function writeZone(zone) {
    // calculate new offsets
    var offset = 68, i;
    
    zone.offsets.ecos = offset;

    offset += 4;
    for (i=0;i<zone.ecos.length;i++) {
        offset += DataSchema.sizeOf(ecoSchema, zone.ecos[i]);
    }
    zone.offsets.floras = offset;

    offset += 4;
    for (i=0;i<zone.floras.length;i++) {
        offset += DataSchema.sizeOf(floraSchema, zone.floras[i]);
    }
    zone.offsets.invisibleWalls = offset;

    offset += 4;
    for (i=0;i<zone.invisibleWalls.length;i++) {
        offset += DataSchema.sizeOf(invisibleWallSchema, zone.invisibleWalls[i]);
    }
    zone.offsets.objects = offset;

    offset += 4;
    for (i=0;i<zone.objects.length;i++) {
        offset += DataSchema.sizeOf(objectSchema, zone.objects[i]);
    }
    zone.offsets.lights = offset;

    offset += 4;
    for (i=0;i<zone.lights.length;i++) {
        offset += DataSchema.sizeOf(lightSchema, zone.lights[i]);
    }
    zone.offsets.unknowns = offset;

    // write data
    var result = DataSchema.pack(schemaH1Z1, zone);

    return result.data;
}

exports.read = readZone;
exports.write = writeZone;
