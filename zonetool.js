#!/usr/bin/env node

var Zone = require("./zone.js"),
    fs = require("fs"),
    path = require("path"),
    VERSION = "0.1.0";
    
console.log();  
console.log("Forgelight Zone Tool " + VERSION);
console.log();

function usage() {
    console.log("Usage: ./zonetool.js <mode> <inPath> [<outPath>]");
    console.log();
    console.log("Modes: json        Export Zone data to JSON");
    console.log("       info        Print general information about Zone data");
    console.log("       write       Write JSON data to .zone file");
    console.log("       test        Test tool integrity on zone file <inpath> ");

}
    
var mode = process.argv[2],
    inPath = process.argv[3],
    outPath = process.argv[4],
    zone, json;
    

switch (mode) {
    case "json":
        if (inPath) {
            if (!fs.existsSync(inPath)) {
                throw "inPath does not exist";
            }
            var data = fs.readFileSync(inPath);
            zone = Zone.read(data);
            console.log("Converting ZONE to JSON...");
            if (!outPath) {
                outPath = process.argv[4];
                if (outPath) {
                    if (fs.existsSync(outPath)) {
                        if (fs.statSync(outPath).isDirectory()) {
                            outPath += path.basename(inPath, ".zone") + ".json";
                        } else {
                            throw "File already exists: " + outPath;
                        }
                    }
                } else {
                    outPath = path.join(path.dirname(inPath), path.basename(inPath, ".zone") + ".json");
                }
            }
            console.log("Writing data to file:", outPath);
            json = JSON.stringify(zone, null, 4);
            fs.writeFileSync(outPath, json);
            console.log("Done.");
        } else {
            usage();
        }
        break;
    case "write":
        if (inPath) {
            if (!fs.existsSync(inPath)) {
                throw "inPath does not exist";
            }
            var zone = JSON.parse(fs.readFileSync(inPath));
            console.log("Converting JSON to ZONE...");
            if (!outPath) {
                outPath = process.argv[4];
                if (outPath) {
                    if (fs.existsSync(outPath)) {
                        if (fs.statSync(outPath).isDirectory()) {
                            outPath += path.basename(inPath, ".json") + ".zone";
                        } else {
                            throw "File already exists: " + outPath;
                        }
                    }
                } else {
                    outPath = path.join(path.dirname(inPath), path.basename(inPath, ".json") + ".zone");
                }
            }
            console.log("Writing data to file:", outPath);
            var data = Zone.write(zone);
            fs.writeFileSync(outPath, data);
            console.log("Done.");
        } else {
            usage();
        }
        break;
    case "test":
        if (inPath) {
            if (!fs.existsSync(inPath)) {
                throw "inPath does not exist";
            }
            var data = fs.readFileSync(inPath);
            zone = Zone.read(data);
            var data2 = Zone.write(zone);
            
            if (data.length == data2.length) {
                for (var i=0,j=data.length;i<j;i++) {
                    if (data[i] !== data2[i]) {
                        fs.writeFileSync("test1.dat", data);
                        fs.writeFileSync("test2.dat", data2);

                        console.log("Data mismatch at offset " + i);
                        break;
                    }
                }
                if (i == data.length) {
                    console.log("Integrity test passed!");
                }
            } else {
                fs.writeFileSync("test1.dat", data);
                fs.writeFileSync("test2.dat", data2);
                console.log("Data length mismatch: " + data.length + " != " + data2.length);
            }
        } else {
            usage();
        }
        break;
    case "info":
        if (inPath) {
            if (!fs.existsSync(inPath)) {
                throw "inPath does not exist";
            }
            var data = fs.readFileSync(inPath);
            zone = Zone.read(data);
            console.log("Zone Info: " + path.basename(inPath));
            console.log();
            console.log("quadsPerTile:      ", zone.quadsPerTile);
            console.log("tileSize:          ", zone.tileSize);
            console.log("tileHeight:        ", 1/zone.tileHeight);
            console.log("vertsPerTile:      ", zone.vertsPerTile);
            console.log("tilesPerChunk:     ", zone.tilesPerChunk);
            console.log("startX:            ", zone.startX);
            console.log("startY:            ", zone.startY);
            console.log("chunksX:           ", zone.chunksX);
            console.log("chunksY:           ", zone.chunksY);
            console.log("ECOs:              ", zone.ecos.length);
            console.log("Floras:            ", zone.floras.length);
            console.log("Invisible Walls:   ", zone.invisibleWalls.length);
            console.log("Object Instances:  ", zone.objects.length);
            console.log("Lights:            ", zone.lights.length);
        } else {
            usage();
        }
        break;
    default: 
        console.log("Unknown mode:", mode);
        usage();
}

var f = new Buffer(4);

f[0] = 0x80;
f[1] = 0x80;
f[2] = 0x80;
f[3] = 0x80;

