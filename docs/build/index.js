(() => {
  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };
  var __accessCheck = (obj, member, msg) => {
    if (!member.has(obj))
      throw TypeError("Cannot " + msg);
  };
  var __privateGet = (obj, member, getter) => {
    __accessCheck(obj, member, "read from private field");
    return getter ? getter.call(obj) : member.get(obj);
  };
  var __privateAdd = (obj, member, value) => {
    if (member.has(obj))
      throw TypeError("Cannot add the same private member more than once");
    member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  };
  var __privateSet = (obj, member, value, setter) => {
    __accessCheck(obj, member, "write to private field");
    setter ? setter.call(obj, value) : member.set(obj, value);
    return value;
  };

  // minify-css:/app/src/styles.css
  var styles_default = `.container{background-color:var(--base00);color:var(--base05);padding:10px;letter-spacing:0.5px;font-family:monospace;border-radius:3px}.toolbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;padding-bottom:5px;border-bottom:solid 1px var(--base02)}.toolbar .options,.toolbar .search-wrapper{display:flex;align-items:center}.toolbar .icon-wrapper{height:15px;display:flex;align-items:center;padding:2px 5px}.toolbar .icon-wrapper:hover{background-color:var(--base02);border-radius:3px}.toolbar .icon-wrapper:first-child{margin-left:0px}.toolbar .search.icon{margin-right:5px}.toolbar .search-input{border:none;background:transparent;outline:none;flex:1;font-size:16px;color:var(--base0D)}.match{background-color:yellow;font-weight:bold;color:red}.data-row{padding:3px 0}.data-row .data-row{border-left:solid 1px var(--base02);padding-left:20px;margin-left:5px;display:none}.data-row.expanded>.data-row{display:block}.data-row .key-value-wrapper{display:flex;align-items:center}.data-row .key{color:var(--base07)}.data-row .key.number{color:var(--base0C)}.data-row .colon{color:var(--base07);margin:0 5px}.clickable{cursor:pointer}.data-row .opening-parenthesis,.data-row .closing-parenthesis{color:var(--base07)}.data-row .ellipsis{color:var(--base09)}.data-row.expanded>.key-value-wrapper .closing-parenthesis,.data-row.expanded>.key-value-wrapper .ellipsis{display:none}.data-row>.closing-parenthesis{display:none}.data-row.expanded>.closing-parenthesis{display:inline-block}.data-row .items-size{margin-left:10px;color:var(--base04);font-style:italic;display:none}.show-size .data-row .items-size{display:inline-block}.data-row .value.bool,.data-row .value.boolean{color:var(--base0E)}.data-row .value.function{color:var(--base0D)}.data-row .value.int,.data-row .value.integer{color:var(--base0F)}.data-row .value.float{color:var(--base0B)}.data-row .value.string{color:var(--base09)}.data-row .value.string .content{overflow-wrap:break-word}.data-row .value.string .content::before{content:open-quote}.data-row .value.string .content::after{content:close-quote}.data-row .value.regexp{color:var(--base0A)}.data-row .value.nan{color:var(--base08)}.data-row .value.null{color:var(--base0A)}.data-row .value.undefined{color:var(--base05)}.data-row .value.date{color:var(--base0D)}.data-row .value.nan,.data-row .value.null,.data-row .value.undefined{border-radius:3px;background-color:var(--base02);padding:1px 2px}.data-row .value .type{font-size:smaller;margin-right:4px;opacity:0.8;display:none}.show-data-types .data-row .value .type{display:inline-block}.icon-wrapper,.copy-icon-wrapper{display:inline-block;cursor:pointer}.icon{display:block;position:relative}.icon:before,.icon:after{content:"";position:absolute;display:block}.expand.icon{margin-right:5px}.expand-icon-arrow .expand.icon{margin-left:3px;width:0;height:0;border-left:solid 6px var(--base0E);border-top:solid 6px transparent;border-bottom:solid 6px transparent}.expand-icon-arrow .expanded>.key-value-wrapper .expand.icon,.expand-icon-arrow .expanded.icon.expand{transform:rotate(90deg);border-left-color:var(--base0D)}.expand-icon-square .expand.icon,.expand-icon-circle .expand.icon{display:block;width:9px;height:9px;border-radius:2px;border:solid 1px var(--base0E)}.expand-icon-circle .expand.icon{border-radius:50%}.expand-icon-square .expand.icon:before,.expand-icon-circle .expand.icon:before,.expand-icon-square .expand.icon:after,.expand-icon-circle .expand.icon:after{width:5px;height:1px;background-color:var(--base0E);left:2px;top:4px}.expand-icon-square .expand.icon:after,.expand-icon-circle .expand.icon:after{transform:rotate(90deg)}.expand-icon-square .expanded>.key-value-wrapper .expand.icon:after,.expand-icon-circle .expanded>.key-value-wrapper .expand.icon:after,.expand-icon-square .expand.icon.expanded:after,.expand-icon-circle .expand.icon.expanded:after{display:none}.expand-icon-square .expanded>.key-value-wrapper .expand.icon,.expand-icon-circle .expanded>.key-value-wrapper .expand.icon,.expand-icon-square .expand.icon.expanded,.expand-icon-circle .expanded.expand.icon{border-color:var(--base0D)}.expand-icon-square .expanded>.key-value-wrapper .expand.icon:before,.expand-icon-circle .expanded>.key-value-wrapper .expand.icon:before,.expand-icon-square .expanded.expand.icon:before,.expand-icon-circle .expanded.expand.icon:before{background-color:var(--base0D)}.icon-wrapper{display:inline-block;cursor:pointer}.show-copy .key-value-wrapper:hover .icon.copy{display:block}.copy.icon{margin-left:10px;display:none;width:8px;height:10px;border:solid 1px var(--base0D);border-radius:1px;position:relative;top:4px;transition:0.2s all}.copy.icon:active{transform:scale(1.6);background-color:var(--base0B)}.copy.icon:before{content:"";display:block;left:-3px;top:-3px;width:8px;height:10px;border-top:solid 1px var(--base0D);border-left:solid 1px var(--base0D);border-radius:1px 0 0 0}.plus.icon{width:11px;height:1px;background-color:var(--base0D)}.plus.icon:after{content:'';width:11px;height:1px;background-color:var(--base0D);-webkit-transform:rotate(90deg);transform:rotate(90deg)}.minus.icon{width:11px;height:1px;background-color:var(--base0D)}.indent.icon{color:var(--base0D);width:17px;height:8px;border-top:solid 1px var(--base0D);border-bottom:solid 1px var(--base0D)}.indent.icon:before{content:'';position:absolute;top:2px;right:0;width:11px;height:2px;border-top:solid 1px var(--base0D);border-bottom:solid 1px var(--base0D)}.indent.icon:after{content:'';position:absolute;top:1px;width:0;height:0;border-top:solid 3px transparent;border-bottom:solid 3px transparent;border-left:solid 3px var(--base0D);border-right:solid 3px transparent}.outdent.icon{color:var(--base0D);margin-left:2px;width:17px;height:8px;border-top:solid 1px var(--base0D);border-bottom:solid 1px var(--base0D)}.outdent.icon:before{content:'';top:2px;right:0;width:11px;height:2px;border-top:solid 1px var(--base0D);border-bottom:solid 1px var(--base0D)}.outdent.icon:after{content:'';top:1px;left:-3px;width:0;height:0;border-top:solid 3px transparent;border-bottom:solid 3px transparent;border-left:solid 3px transparent;border-right:solid 3px var(--base0D)}.refresh.icon{color:var(--base0D);width:10px;height:10px;border-radius:50%;border-top:solid 1px var(--base0D);border-bottom:solid 1px var(--base0D);border-left:solid 1px transparent;border-right:solid 1px var(--base0D)}.refresh.icon:before{content:'';left:1px;top:8px;width:3px;height:3px;border-top:solid 1px var(--base0D);border-left:solid 1px var(--base0D);-webkit-transform:rotate(-22.5deg);transform:rotate(-22.5deg)}.info.icon{width:12px;height:11px;border:solid 1px var(--base0D);border-radius:2px}.info.icon::before{top:5px;left:5px;width:2px;height:5px;background-color:var(--base0D)}.info.icon::after{top:2px;left:5px;width:2px;height:2px;background-color:var(--base0D)}.info.icon.active{background-color:var(--base0D)}.info.icon.active::before,.info.icon.active::after{background-color:var(--base02)}.search.icon{color:var(--base0D);width:11px;height:11px;border:solid 1px var(--base0D);border-radius:100%;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.search.icon:before{content:'';top:11px;left:5px;height:6px;width:1px;background-color:var(--base0D)}
`;

  // src/themes.js
  var themes = {
    apathy: {
      base00: "#031a16",
      base01: "#0b342d",
      base02: "#184e45",
      base03: "#2b685e",
      base04: "#5f9c92",
      base05: "#81b5ac",
      base06: "#a7cec8",
      base07: "#d2e7e4",
      base08: "#3e9688",
      base09: "#3e7996",
      base0A: "#3e4c96",
      base0B: "#883e96",
      base0C: "#963e4c",
      base0D: "#96883e",
      base0E: "#4c963e",
      base0F: "#3e965b"
    },
    ashes: {
      base00: "#1c2023",
      base01: "#393f45",
      base02: "#565e65",
      base03: "#747c84",
      base04: "#adb3ba",
      base05: "#c7ccd1",
      base06: "#dfe2e5",
      base07: "#f3f4f5",
      base08: "#c7ae95",
      base09: "#c7c795",
      base0A: "#aec795",
      base0B: "#95c7ae",
      base0C: "#95aec7",
      base0D: "#ae95c7",
      base0E: "#c795ae",
      base0F: "#c79595"
    },
    "atelier-dune-light": {
      base00: "#fefbec",
      base01: "#e8e4cf",
      base02: "#a6a28c",
      base03: "#999580",
      base04: "#7d7a68",
      base05: "#6e6b5e",
      base06: "#292824",
      base07: "#20201d",
      base08: "#d73737",
      base09: "#b65611",
      base0A: "#ae9513",
      base0B: "#60ac39",
      base0C: "#1fad83",
      base0D: "#6684e1",
      base0E: "#b854d4",
      base0F: "#d43552"
    },
    "atelier-dune": {
      base00: "#20201d",
      base01: "#292824",
      base02: "#6e6b5e",
      base03: "#7d7a68",
      base04: "#999580",
      base05: "#a6a28c",
      base06: "#e8e4cf",
      base07: "#fefbec",
      base08: "#d73737",
      base09: "#b65611",
      base0A: "#ae9513",
      base0B: "#60ac39",
      base0C: "#1fad83",
      base0D: "#6684e1",
      base0E: "#b854d4",
      base0F: "#d43552"
    },
    atlas: {
      base00: "#002635",
      base01: "#00384d",
      base02: "#517f8d",
      base03: "#6c8b91",
      base04: "#869696",
      base05: "#a1a19a",
      base06: "#e6e6dc",
      base07: "#fafaf8",
      base08: "#ff5a67",
      base09: "#f08e48",
      base0A: "#ffcc1b",
      base0B: "#7fc06e",
      base0C: "#14747e",
      base0D: "#5dd7b9",
      base0E: "#9a70a4",
      base0F: "#c43060"
    },
    bespin: {
      base00: "#28211c",
      base01: "#36312e",
      base02: "#5e5d5c",
      base03: "#666666",
      base04: "#797977",
      base05: "#8a8986",
      base06: "#9d9b97",
      base07: "#baae9e",
      base08: "#cf6a4c",
      base09: "#cf7d34",
      base0A: "#f9ee98",
      base0B: "#54be0d",
      base0C: "#afc4db",
      base0D: "#5ea6ea",
      base0E: "#9b859d",
      base0F: "#937121"
    },
    "black-metal": {
      base00: "#000000",
      base01: "#121212",
      base02: "#222222",
      base03: "#333333",
      base04: "#999999",
      base05: "#c1c1c1",
      base06: "#999999",
      base07: "#c1c1c1",
      base08: "#5f8787",
      base09: "#aaaaaa",
      base0A: "#a06666",
      base0B: "#dd9999",
      base0C: "#aaaaaa",
      base0D: "#888888",
      base0E: "#999999",
      base0F: "#444444"
    },
    brewer: {
      base00: "#0c0d0e",
      base01: "#2e2f30",
      base02: "#515253",
      base03: "#737475",
      base04: "#959697",
      base05: "#b7b8b9",
      base06: "#dadbdc",
      base07: "#fcfdfe",
      base08: "#e31a1c",
      base09: "#e6550d",
      base0A: "#dca060",
      base0B: "#31a354",
      base0C: "#80b1d3",
      base0D: "#3182bd",
      base0E: "#756bb1",
      base0F: "#b15928"
    },
    bright: {
      base00: "#000000",
      base01: "#303030",
      base02: "#505050",
      base03: "#b0b0b0",
      base04: "#d0d0d0",
      base05: "#e0e0e0",
      base06: "#f5f5f5",
      base07: "#ffffff",
      base08: "#fb0120",
      base09: "#fc6d24",
      base0A: "#fda331",
      base0B: "#a1c659",
      base0C: "#76c7b7",
      base0D: "#6fb3d2",
      base0E: "#d381c3",
      base0F: "#be643c"
    },
    brogrammer: {
      base00: "#1f1f1f",
      base01: "#f81118",
      base02: "#2dc55e",
      base03: "#ecba0f",
      base04: "#2a84d2",
      base05: "#4e5ab7",
      base06: "#1081d6",
      base07: "#d6dbe5",
      base08: "#d6dbe5",
      base09: "#de352e",
      base0A: "#1dd361",
      base0B: "#f3bd09",
      base0C: "#1081d6",
      base0D: "#5350b9",
      base0E: "#0f7ddb",
      base0F: "#ffffff"
    },
    "brushtrees-dark": {
      base00: "#485867",
      base01: "#5a6d7a",
      base02: "#6d828e",
      base03: "#8299a1",
      base04: "#98afb5",
      base05: "#b0c5c8",
      base06: "#c9dbdc",
      base07: "#e3efef",
      base08: "#b38686",
      base09: "#d8bba2",
      base0A: "#aab386",
      base0B: "#87b386",
      base0C: "#86b3b3",
      base0D: "#868cb3",
      base0E: "#b386b2",
      base0F: "#b39f9f"
    },
    brushtrees: {
      base00: "#e3efef",
      base01: "#c9dbdc",
      base02: "#b0c5c8",
      base03: "#98afb5",
      base04: "#8299a1",
      base05: "#6d828e",
      base06: "#5a6d7a",
      base07: "#485867",
      base08: "#b38686",
      base09: "#d8bba2",
      base0A: "#aab386",
      base0B: "#87b386",
      base0C: "#86b3b3",
      base0D: "#868cb3",
      base0E: "#b386b2",
      base0F: "#b39f9f"
    },
    chalk: {
      base00: "#151515",
      base01: "#202020",
      base02: "#303030",
      base03: "#505050",
      base04: "#b0b0b0",
      base05: "#d0d0d0",
      base06: "#e0e0e0",
      base07: "#f5f5f5",
      base08: "#fb9fb1",
      base09: "#eda987",
      base0A: "#ddb26f",
      base0B: "#acc267",
      base0C: "#12cfc0",
      base0D: "#6fc2ef",
      base0E: "#e1a3ee",
      base0F: "#deaf8f"
    },
    circus: {
      base00: "#191919",
      base01: "#202020",
      base02: "#303030",
      base03: "#5f5a60",
      base04: "#505050",
      base05: "#a7a7a7",
      base06: "#808080",
      base07: "#ffffff",
      base08: "#dc657d",
      base09: "#4bb1a7",
      base0A: "#c3ba63",
      base0B: "#84b97c",
      base0C: "#4bb1a7",
      base0D: "#639ee4",
      base0E: "#b888e2",
      base0F: "#b888e2"
    },
    "classic-dark": {
      base00: "#151515",
      base01: "#202020",
      base02: "#303030",
      base03: "#505050",
      base04: "#b0b0b0",
      base05: "#d0d0d0",
      base06: "#e0e0e0",
      base07: "#f5f5f5",
      base08: "#ac4142",
      base09: "#d28445",
      base0A: "#f4bf75",
      base0B: "#90a959",
      base0C: "#75b5aa",
      base0D: "#6a9fb5",
      base0E: "#aa759f",
      base0F: "#8f5536"
    },
    "classic-light": {
      base00: "#f5f5f5",
      base01: "#e0e0e0",
      base02: "#d0d0d0",
      base03: "#b0b0b0",
      base04: "#505050",
      base05: "#303030",
      base06: "#202020",
      base07: "#151515",
      base08: "#ac4142",
      base09: "#d28445",
      base0A: "#f4bf75",
      base0B: "#90a959",
      base0C: "#75b5aa",
      base0D: "#6a9fb5",
      base0E: "#aa759f",
      base0F: "#8f5536"
    },
    codeschool: {
      base00: "#232c31",
      base01: "#1c3657",
      base02: "#2a343a",
      base03: "#3f4944",
      base04: "#84898c",
      base05: "#9ea7a6",
      base06: "#a7cfa3",
      base07: "#b5d8f6",
      base08: "#2a5491",
      base09: "#43820d",
      base0A: "#a03b1e",
      base0B: "#237986",
      base0C: "#b02f30",
      base0D: "#484d79",
      base0E: "#c59820",
      base0F: "#c98344"
    },
    cupcake: {
      base00: "#fbf1f2",
      base01: "#f2f1f4",
      base02: "#d8d5dd",
      base03: "#bfb9c6",
      base04: "#a59daf",
      base05: "#8b8198",
      base06: "#72677e",
      base07: "#585062",
      base08: "#d57e85",
      base09: "#ebb790",
      base0A: "#dcb16c",
      base0B: "#a3b367",
      base0C: "#69a9a7",
      base0D: "#7297b9",
      base0E: "#bb99b4",
      base0F: "#baa58c"
    },
    cupertino: {
      base00: "#ffffff",
      base01: "#c0c0c0",
      base02: "#c0c0c0",
      base03: "#808080",
      base04: "#808080",
      base05: "#404040",
      base06: "#404040",
      base07: "#5e5e5e",
      base08: "#c41a15",
      base09: "#eb8500",
      base0A: "#826b28",
      base0B: "#007400",
      base0C: "#318495",
      base0D: "#0000ff",
      base0E: "#a90d91",
      base0F: "#826b28"
    },
    darcula: {
      base00: "#2b2b2b",
      base01: "#323232",
      base02: "#323232",
      base03: "#606366",
      base04: "#a4a3a3",
      base05: "#a9b7c6",
      base06: "#ffc66d",
      base07: "#ffffff",
      base08: "#4eade5",
      base09: "#689757",
      base0A: "#bbb529",
      base0B: "#6a8759",
      base0C: "#629755",
      base0D: "#9876aa",
      base0E: "#cc7832",
      base0F: "#808080"
    },
    darktooth: {
      base00: "#1d2021",
      base01: "#32302f",
      base02: "#504945",
      base03: "#665c54",
      base04: "#928374",
      base05: "#a89984",
      base06: "#d5c4a1",
      base07: "#fdf4c1",
      base08: "#fb543f",
      base09: "#fe8625",
      base0A: "#fac03b",
      base0B: "#95c085",
      base0C: "#8ba59b",
      base0D: "#0d6678",
      base0E: "#8f4673",
      base0F: "#a87322"
    },
    "default-dark": {
      base00: "#181818",
      base01: "#282828",
      base02: "#383838",
      base03: "#585858",
      base04: "#b8b8b8",
      base05: "#d8d8d8",
      base06: "#e8e8e8",
      base07: "#f8f8f8",
      base08: "#ab4642",
      base09: "#dc9656",
      base0A: "#f7ca88",
      base0B: "#a1b56c",
      base0C: "#86c1b9",
      base0D: "#7cafc2",
      base0E: "#ba8baf",
      base0F: "#a16946"
    },
    "default-light": {
      base00: "#ffffff",
      base01: "#e8e8e8",
      base02: "#d8d8d8",
      base03: "#b8b8b8",
      base04: "#585858",
      base05: "#383838",
      base06: "#282828",
      base07: "#181818",
      base08: "#ab4642",
      base09: "#dc9656",
      base0A: "#ab4642",
      base0B: "#a1b56c",
      base0C: "#86c1b9",
      base0D: "#7cafc2",
      base0E: "#ba8baf",
      base0F: "#a16946"
    },
    dracula: {
      base00: "#282936",
      base01: "#3a3c4e",
      base02: "#4d4f68",
      base03: "#626483",
      base04: "#62d6e8",
      base05: "#e9e9f4",
      base06: "#f1f2f8",
      base07: "#f7f7fb",
      base08: "#ea51b2",
      base09: "#b45bcf",
      base0A: "#00f769",
      base0B: "#ebff87",
      base0C: "#a1efe4",
      base0D: "#62d6e8",
      base0E: "#b45bcf",
      base0F: "#00f769"
    },
    eighties: {
      base00: "#2d2d2d",
      base01: "#393939",
      base02: "#515151",
      base03: "#747369",
      base04: "#a09f93",
      base05: "#d3d0c8",
      base06: "#e8e6df",
      base07: "#f2f0ec",
      base08: "#f2777a",
      base09: "#f99157",
      base0A: "#ffcc66",
      base0B: "#99cc99",
      base0C: "#66cccc",
      base0D: "#6699cc",
      base0E: "#cc99cc",
      base0F: "#d27b53"
    },
    embers: {
      base00: "#16130f",
      base01: "#2c2620",
      base02: "#433b32",
      base03: "#5a5047",
      base04: "#8a8075",
      base05: "#a39a90",
      base06: "#beb6ae",
      base07: "#dbd6d1",
      base08: "#826d57",
      base09: "#828257",
      base0A: "#6d8257",
      base0B: "#57826d",
      base0C: "#576d82",
      base0D: "#6d5782",
      base0E: "#82576d",
      base0F: "#825757"
    },
    flat: {
      base00: "#2c3e50",
      base01: "#34495e",
      base02: "#7f8c8d",
      base03: "#95a5a6",
      base04: "#bdc3c7",
      base05: "#e0e0e0",
      base06: "#f5f5f5",
      base07: "#ecf0f1",
      base08: "#e74c3c",
      base09: "#e67e22",
      base0A: "#f1c40f",
      base0B: "#2ecc71",
      base0C: "#1abc9c",
      base0D: "#3498db",
      base0E: "#9b59b6",
      base0F: "#be643c"
    },
    "fruit-soda": {
      base00: "#f1ecf1",
      base01: "#e0dee0",
      base02: "#d8d5d5",
      base03: "#b5b4b6",
      base04: "#979598",
      base05: "#515151",
      base06: "#474545",
      base07: "#2d2c2c",
      base08: "#fe3e31",
      base09: "#fe6d08",
      base0A: "#f7e203",
      base0B: "#47f74c",
      base0C: "#0f9cfd",
      base0D: "#2931df",
      base0E: "#611fce",
      base0F: "#b16f40"
    },
    github: {
      base00: "#ffffff",
      base01: "#f5f5f5",
      base02: "#c8c8fa",
      base03: "#969896",
      base04: "#e8e8e8",
      base05: "#333333",
      base06: "#ffffff",
      base07: "#ffffff",
      base08: "#ed6a43",
      base09: "#0086b3",
      base0A: "#795da3",
      base0B: "#183691",
      base0C: "#183691",
      base0D: "#795da3",
      base0E: "#a71d5d",
      base0F: "#333333"
    },
    "google-dark": {
      base00: "#1d1f21",
      base01: "#282a2e",
      base02: "#373b41",
      base03: "#969896",
      base04: "#b4b7b4",
      base05: "#c5c8c6",
      base06: "#e0e0e0",
      base07: "#ffffff",
      base08: "#cc342b",
      base09: "#f96a38",
      base0A: "#fba922",
      base0B: "#198844",
      base0C: "#3971ed",
      base0D: "#3971ed",
      base0E: "#a36ac7",
      base0F: "#3971ed"
    },
    "google-light": {
      base00: "#ffffff",
      base01: "#e0e0e0",
      base02: "#c5c8c6",
      base03: "#b4b7b4",
      base04: "#969896",
      base05: "#373b41",
      base06: "#282a2e",
      base07: "#1d1f21",
      base08: "#cc342b",
      base09: "#f96a38",
      base0A: "#fba922",
      base0B: "#198844",
      base0C: "#3971ed",
      base0D: "#3971ed",
      base0E: "#a36ac7",
      base0F: "#3971ed"
    },
    "grayscale-dark": {
      base00: "#101010",
      base01: "#252525",
      base02: "#464646",
      base03: "#525252",
      base04: "#ababab",
      base05: "#b9b9b9",
      base06: "#e3e3e3",
      base07: "#f7f7f7",
      base08: "#7c7c7c",
      base09: "#999999",
      base0A: "#a0a0a0",
      base0B: "#8e8e8e",
      base0C: "#868686",
      base0D: "#686868",
      base0E: "#747474",
      base0F: "#5e5e5e"
    },
    "grayscale-light": {
      base00: "#f7f7f7",
      base01: "#e3e3e3",
      base02: "#b9b9b9",
      base03: "#ababab",
      base04: "#525252",
      base05: "#464646",
      base06: "#252525",
      base07: "#101010",
      base08: "#7c7c7c",
      base09: "#999999",
      base0A: "#a0a0a0",
      base0B: "#8e8e8e",
      base0C: "#868686",
      base0D: "#686868",
      base0E: "#747474",
      base0F: "#5e5e5e"
    },
    greenscreen: {
      base00: "#001100",
      base01: "#003300",
      base02: "#005500",
      base03: "#007700",
      base04: "#009900",
      base05: "#00bb00",
      base06: "#00dd00",
      base07: "#00ff00",
      base08: "#007700",
      base09: "#009900",
      base0A: "#007700",
      base0B: "#00bb00",
      base0C: "#005500",
      base0D: "#009900",
      base0E: "#00bb00",
      base0F: "#005500"
    },
    "gruvbox-dark-hard": {
      base00: "#1d2021",
      base01: "#3c3836",
      base02: "#504945",
      base03: "#665c54",
      base04: "#bdae93",
      base05: "#d5c4a1",
      base06: "#ebdbb2",
      base07: "#fbf1c7",
      base08: "#fb4934",
      base09: "#fe8019",
      base0A: "#fabd2f",
      base0B: "#b8bb26",
      base0C: "#8ec07c",
      base0D: "#83a598",
      base0E: "#d3869b",
      base0F: "#d65d0e"
    },
    "gruvbox-light-hard": {
      base00: "#f9f5d7",
      base01: "#ebdbb2",
      base02: "#d5c4a1",
      base03: "#bdae93",
      base04: "#665c54",
      base05: "#504945",
      base06: "#3c3836",
      base07: "#282828",
      base08: "#9d0006",
      base09: "#af3a03",
      base0A: "#b57614",
      base0B: "#79740e",
      base0C: "#427b58",
      base0D: "#076678",
      base0E: "#8f3f71",
      base0F: "#d65d0e"
    },
    "harmonic-dark": {
      base00: "#0b1c2c",
      base01: "#223b54",
      base02: "#405c79",
      base03: "#627e99",
      base04: "#aabcce",
      base05: "#cbd6e2",
      base06: "#e5ebf1",
      base07: "#f7f9fb",
      base08: "#bf8b56",
      base09: "#bfbf56",
      base0A: "#8bbf56",
      base0B: "#56bf8b",
      base0C: "#568bbf",
      base0D: "#8b56bf",
      base0E: "#bf568b",
      base0F: "#bf5656"
    },
    "harmonic-light": {
      base00: "#f7f9fb",
      base01: "#e5ebf1",
      base02: "#cbd6e2",
      base03: "#aabcce",
      base04: "#627e99",
      base05: "#405c79",
      base06: "#223b54",
      base07: "#0b1c2c",
      base08: "#bf8b56",
      base09: "#bfbf56",
      base0A: "#8bbf56",
      base0B: "#56bf8b",
      base0C: "#568bbf",
      base0D: "#8b56bf",
      base0E: "#bf568b",
      base0F: "#bf5656"
    },
    "heetch-light": {
      base00: "#feffff",
      base01: "#392551",
      base02: "#7b6d8b",
      base03: "#9c92a8",
      base04: "#ddd6e5",
      base05: "#5a496e",
      base06: "#470546",
      base07: "#190134",
      base08: "#27d9d5",
      base09: "#bdb6c5",
      base0A: "#5ba2b6",
      base0B: "#f80059",
      base0C: "#c33678",
      base0D: "#47f9f5",
      base0E: "#bd0152",
      base0F: "#dedae2"
    },
    heetch: {
      base00: "#190134",
      base01: "#392551",
      base02: "#5a496e",
      base03: "#7b6d8b",
      base04: "#9c92a8",
      base05: "#bdb6c5",
      base06: "#dedae2",
      base07: "#feffff",
      base08: "#27d9d5",
      base09: "#5ba2b6",
      base0A: "#8f6c97",
      base0B: "#c33678",
      base0C: "#f80059",
      base0D: "#bd0152",
      base0E: "#82034c",
      base0F: "#470546"
    },
    helios: {
      base00: "#1d2021",
      base01: "#383c3e",
      base02: "#53585b",
      base03: "#6f7579",
      base04: "#cdcdcd",
      base05: "#d5d5d5",
      base06: "#dddddd",
      base07: "#e5e5e5",
      base08: "#d72638",
      base09: "#eb8413",
      base0A: "#f19d1a",
      base0B: "#88b92d",
      base0C: "#1ba595",
      base0D: "#1e8bac",
      base0E: "#be4264",
      base0F: "#c85e0d"
    },
    hopscotch: {
      base00: "#322931",
      base01: "#433b42",
      base02: "#5c545b",
      base03: "#797379",
      base04: "#989498",
      base05: "#b9b5b8",
      base06: "#d5d3d5",
      base07: "#ffffff",
      base08: "#dd464c",
      base09: "#fd8b19",
      base0A: "#fdcc59",
      base0B: "#8fc13e",
      base0C: "#149b93",
      base0D: "#1290bf",
      base0E: "#c85e7c",
      base0F: "#b33508"
    },
    "horizon-dark": {
      base00: "#1c1e26",
      base01: "#232530",
      base02: "#2e303e",
      base03: "#676a8d",
      base04: "#ced1d0",
      base05: "#cbced0",
      base06: "#dcdfe4",
      base07: "#e3e6ee",
      base08: "#e93c58",
      base09: "#e58d7d",
      base0A: "#efb993",
      base0B: "#efaf8e",
      base0C: "#24a8b4",
      base0D: "#df5273",
      base0E: "#b072d1",
      base0F: "#e4a382"
    },
    "ia-dark": {
      base00: "#1a1a1a",
      base01: "#222222",
      base02: "#1d414d",
      base03: "#767676",
      base04: "#b8b8b8",
      base05: "#cccccc",
      base06: "#e8e8e8",
      base07: "#f8f8f8",
      base08: "#d88568",
      base09: "#d86868",
      base0A: "#b99353",
      base0B: "#83a471",
      base0C: "#7c9cae",
      base0D: "#8eccdd",
      base0E: "#b98eb2",
      base0F: "#8b6c37"
    },
    "ia-light": {
      base00: "#f6f6f6",
      base01: "#dedede",
      base02: "#bde5f2",
      base03: "#898989",
      base04: "#767676",
      base05: "#181818",
      base06: "#e8e8e8",
      base07: "#f8f8f8",
      base08: "#9c5a02",
      base09: "#c43e18",
      base0A: "#c48218",
      base0B: "#38781c",
      base0C: "#2d6bb1",
      base0D: "#48bac2",
      base0E: "#a94598",
      base0F: "#8b6c37"
    },
    icy: {
      base00: "#021012",
      base01: "#031619",
      base02: "#041f23",
      base03: "#052e34",
      base04: "#064048",
      base05: "#095b67",
      base06: "#0c7c8c",
      base07: "#109cb0",
      base08: "#16c1d9",
      base09: "#b3ebf2",
      base0A: "#80deea",
      base0B: "#4dd0e1",
      base0C: "#26c6da",
      base0D: "#00bcd4",
      base0E: "#00acc1",
      base0F: "#0097a7"
    },
    isotope: {
      base00: "#000000",
      base01: "#404040",
      base02: "#606060",
      base03: "#808080",
      base04: "#c0c0c0",
      base05: "#d0d0d0",
      base06: "#e0e0e0",
      base07: "#ffffff",
      base08: "#ff0000",
      base09: "#ff9900",
      base0A: "#ff0099",
      base0B: "#33ff00",
      base0C: "#00ffff",
      base0D: "#0066ff",
      base0E: "#cc00ff",
      base0F: "#3300ff"
    },
    macintosh: {
      base00: "#000000",
      base01: "#404040",
      base02: "#404040",
      base03: "#808080",
      base04: "#808080",
      base05: "#c0c0c0",
      base06: "#c0c0c0",
      base07: "#ffffff",
      base08: "#dd0907",
      base09: "#ff6403",
      base0A: "#fbf305",
      base0B: "#1fb714",
      base0C: "#02abea",
      base0D: "#0000d3",
      base0E: "#4700a5",
      base0F: "#90713a"
    },
    marrakesh: {
      base00: "#201602",
      base01: "#302e00",
      base02: "#5f5b17",
      base03: "#6c6823",
      base04: "#86813b",
      base05: "#948e48",
      base06: "#ccc37a",
      base07: "#faf0a5",
      base08: "#c35359",
      base09: "#b36144",
      base0A: "#a88339",
      base0B: "#18974e",
      base0C: "#75a738",
      base0D: "#477ca1",
      base0E: "#8868b3",
      base0F: "#b3588e"
    },
    materia: {
      base00: "#263238",
      base01: "#2c393f",
      base02: "#37474f",
      base03: "#707880",
      base04: "#c9ccd3",
      base05: "#cdd3de",
      base06: "#d5dbe5",
      base07: "#ffffff",
      base08: "#ec5f67",
      base09: "#ea9560",
      base0A: "#ffcc00",
      base0B: "#8bd649",
      base0C: "#80cbc4",
      base0D: "#89ddff",
      base0E: "#82aaff",
      base0F: "#ec5f67"
    },
    "material-lighter": {
      base00: "#fafafa",
      base01: "#e7eaec",
      base02: "#cceae7",
      base03: "#ccd7da",
      base04: "#8796b0",
      base05: "#80cbc4",
      base06: "#80cbc4",
      base07: "#666666",
      base08: "#ff5370",
      base09: "#f76d47",
      base0A: "#ffb62c",
      base0B: "#91b859",
      base0C: "#39adb5",
      base0D: "#6182b8",
      base0E: "#7c4dff",
      base0F: "#e53935"
    },
    material: {
      base00: "#263238",
      base01: "#2e3c43",
      base02: "#314549",
      base03: "#546e7a",
      base04: "#b2ccd6",
      base05: "#eeffff",
      base06: "#eeffff",
      base07: "#ffffff",
      base08: "#f07178",
      base09: "#f78c6c",
      base0A: "#ffcb6b",
      base0B: "#c3e88d",
      base0C: "#89ddff",
      base0D: "#82aaff",
      base0E: "#c792ea",
      base0F: "#ff5370"
    },
    "mellow-purple": {
      base00: "#1e0528",
      base01: "#1a092d",
      base02: "#331354",
      base03: "#320f55",
      base04: "#873582",
      base05: "#ffeeff",
      base06: "#ffeeff",
      base07: "#f8c0ff",
      base08: "#00d9e9",
      base09: "#aa00a3",
      base0A: "#955ae7",
      base0B: "#05cb0d",
      base0C: "#b900b1",
      base0D: "#550068",
      base0E: "#8991bb",
      base0F: "#4d6fff"
    },
    "mexico-light": {
      base00: "#f8f8f8",
      base01: "#e8e8e8",
      base02: "#d8d8d8",
      base03: "#b8b8b8",
      base04: "#585858",
      base05: "#383838",
      base06: "#282828",
      base07: "#181818",
      base08: "#ab4642",
      base09: "#dc9656",
      base0A: "#f79a0e",
      base0B: "#538947",
      base0C: "#4b8093",
      base0D: "#7cafc2",
      base0E: "#96609e",
      base0F: "#a16946"
    },
    mocha: {
      base00: "#3b3228",
      base01: "#534636",
      base02: "#645240",
      base03: "#7e705a",
      base04: "#b8afad",
      base05: "#d0c8c6",
      base06: "#e9e1dd",
      base07: "#f5eeeb",
      base08: "#cb6077",
      base09: "#d28b71",
      base0A: "#f4bc87",
      base0B: "#beb55b",
      base0C: "#7bbda4",
      base0D: "#8ab3b5",
      base0E: "#a89bb9",
      base0F: "#bb9584"
    },
    monokai: {
      base00: "#272822",
      base01: "#383830",
      base02: "#49483e",
      base03: "#75715e",
      base04: "#a59f85",
      base05: "#f8f8f2",
      base06: "#f5f4f1",
      base07: "#f9f8f5",
      base08: "#f92672",
      base09: "#fd971f",
      base0A: "#f4bf75",
      base0B: "#a6e22e",
      base0C: "#a1efe4",
      base0D: "#66d9ef",
      base0E: "#ae81ff",
      base0F: "#cc6633"
    },
    nord: {
      base00: "#2e3440",
      base01: "#3b4252",
      base02: "#434c5e",
      base03: "#4c566a",
      base04: "#d8dee9",
      base05: "#e5e9f0",
      base06: "#eceff4",
      base07: "#8fbcbb",
      base08: "#88c0d0",
      base09: "#81a1c1",
      base0A: "#5e81ac",
      base0B: "#bf616a",
      base0C: "#d08770",
      base0D: "#ebcb8b",
      base0E: "#a3be8c",
      base0F: "#b48ead"
    },
    ocean: {
      base00: "#2b303b",
      base01: "#343d46",
      base02: "#4f5b66",
      base03: "#65737e",
      base04: "#a7adba",
      base05: "#c0c5ce",
      base06: "#dfe1e8",
      base07: "#eff1f5",
      base08: "#bf616a",
      base09: "#d08770",
      base0A: "#ebcb8b",
      base0B: "#a3be8c",
      base0C: "#96b5b4",
      base0D: "#8fa1b3",
      base0E: "#b48ead",
      base0F: "#ab7967"
    },
    "one-light": {
      base00: "#fafafa",
      base01: "#f0f0f1",
      base02: "#e5e5e6",
      base03: "#a0a1a7",
      base04: "#696c77",
      base05: "#383a42",
      base06: "#202227",
      base07: "#090a0b",
      base08: "#ca1243",
      base09: "#d75f00",
      base0A: "#c18401",
      base0B: "#50a14f",
      base0C: "#0184bc",
      base0D: "#4078f2",
      base0E: "#a626a4",
      base0F: "#986801"
    },
    onedark: {
      base00: "#282c34",
      base01: "#353b45",
      base02: "#3e4451",
      base03: "#545862",
      base04: "#565c64",
      base05: "#abb2bf",
      base06: "#b6bdca",
      base07: "#c8ccd4",
      base08: "#e06c75",
      base09: "#d19a66",
      base0A: "#e5c07b",
      base0B: "#98c379",
      base0C: "#56b6c2",
      base0D: "#61afef",
      base0E: "#c678dd",
      base0F: "#be5046"
    },
    "papercolor-dark": {
      base00: "#1c1c1c",
      base01: "#af005f",
      base02: "#5faf00",
      base03: "#d7af5f",
      base04: "#5fafd7",
      base05: "#808080",
      base06: "#d7875f",
      base07: "#d0d0d0",
      base08: "#585858",
      base09: "#5faf5f",
      base0A: "#afd700",
      base0B: "#af87d7",
      base0C: "#ffaf00",
      base0D: "#ff5faf",
      base0E: "#00afaf",
      base0F: "#5f8787"
    },
    "papercolor-light": {
      base00: "#eeeeee",
      base01: "#af0000",
      base02: "#008700",
      base03: "#5f8700",
      base04: "#0087af",
      base05: "#878787",
      base06: "#005f87",
      base07: "#444444",
      base08: "#bcbcbc",
      base09: "#d70000",
      base0A: "#d70087",
      base0B: "#8700af",
      base0C: "#d75f00",
      base0D: "#d75f00",
      base0E: "#005faf",
      base0F: "#005f87"
    },
    paraiso: {
      base00: "#2f1e2e",
      base01: "#41323f",
      base02: "#4f424c",
      base03: "#776e71",
      base04: "#8d8687",
      base05: "#a39e9b",
      base06: "#b9b6b0",
      base07: "#e7e9db",
      base08: "#ef6155",
      base09: "#f99b15",
      base0A: "#fec418",
      base0B: "#48b685",
      base0C: "#5bc4bf",
      base0D: "#06b6ef",
      base0E: "#815ba4",
      base0F: "#e96ba8"
    },
    pico: {
      base00: "#000000",
      base01: "#1d2b53",
      base02: "#7e2553",
      base03: "#008751",
      base04: "#ab5236",
      base05: "#5f574f",
      base06: "#c2c3c7",
      base07: "#fff1e8",
      base08: "#ff004d",
      base09: "#ffa300",
      base0A: "#fff024",
      base0B: "#00e756",
      base0C: "#29adff",
      base0D: "#83769c",
      base0E: "#ff77a8",
      base0F: "#ffccaa"
    },
    pop: {
      base00: "#000000",
      base01: "#202020",
      base02: "#303030",
      base03: "#505050",
      base04: "#b0b0b0",
      base05: "#d0d0d0",
      base06: "#e0e0e0",
      base07: "#ffffff",
      base08: "#eb008a",
      base09: "#f29333",
      base0A: "#f8ca12",
      base0B: "#37b349",
      base0C: "#00aabb",
      base0D: "#0e5a94",
      base0E: "#b31e8d",
      base0F: "#7a2d00"
    },
    railscasts: {
      base00: "#2b2b2b",
      base01: "#272935",
      base02: "#3a4055",
      base03: "#5a647e",
      base04: "#d4cfc9",
      base05: "#e6e1dc",
      base06: "#f4f1ed",
      base07: "#f9f7f3",
      base08: "#da4939",
      base09: "#cc7833",
      base0A: "#ffc66d",
      base0B: "#a5c261",
      base0C: "#519f50",
      base0D: "#6d9cbe",
      base0E: "#b6b3eb",
      base0F: "#bc9458"
    },
    seti: {
      base00: "#151718",
      base01: "#282a2b",
      base02: "#3b758c",
      base03: "#41535b",
      base04: "#43a5d5",
      base05: "#d6d6d6",
      base06: "#eeeeee",
      base07: "#ffffff",
      base08: "#cd3f45",
      base09: "#db7b55",
      base0A: "#e6cd69",
      base0B: "#9fca56",
      base0C: "#55dbbe",
      base0D: "#55b5db",
      base0E: "#a074c4",
      base0F: "#8a553f"
    },
    "solarized-dark": {
      base00: "#002b36",
      base01: "#073642",
      base02: "#586e75",
      base03: "#657b83",
      base04: "#839496",
      base05: "#93a1a1",
      base06: "#eee8d5",
      base07: "#fdf6e3",
      base08: "#dc322f",
      base09: "#cb4b16",
      base0A: "#b58900",
      base0B: "#859900",
      base0C: "#2aa198",
      base0D: "#268bd2",
      base0E: "#6c71c4",
      base0F: "#d33682"
    },
    "solarized-light": {
      base00: "#fdf6e3",
      base01: "#eee8d5",
      base02: "#93a1a1",
      base03: "#839496",
      base04: "#657b83",
      base05: "#586e75",
      base06: "#073642",
      base07: "#002b36",
      base08: "#dc322f",
      base09: "#cb4b16",
      base0A: "#b58900",
      base0B: "#859900",
      base0C: "#2aa198",
      base0D: "#268bd2",
      base0E: "#6c71c4",
      base0F: "#d33682"
    },
    spacemacs: {
      base00: "#1f2022",
      base01: "#282828",
      base02: "#444155",
      base03: "#585858",
      base04: "#b8b8b8",
      base05: "#a3a3a3",
      base06: "#e8e8e8",
      base07: "#f8f8f8",
      base08: "#f2241f",
      base09: "#ffa500",
      base0A: "#b1951d",
      base0B: "#67b11d",
      base0C: "#2d9574",
      base0D: "#4f97d7",
      base0E: "#a31db1",
      base0F: "#b03060"
    },
    "summerfruit-dark": {
      base00: "#151515",
      base01: "#202020",
      base02: "#303030",
      base03: "#505050",
      base04: "#b0b0b0",
      base05: "#d0d0d0",
      base06: "#e0e0e0",
      base07: "#ffffff",
      base08: "#ff0086",
      base09: "#fd8900",
      base0A: "#aba800",
      base0B: "#00c918",
      base0C: "#1faaaa",
      base0D: "#3777e6",
      base0E: "#ad00a1",
      base0F: "#cc6633"
    },
    "summerfruit-light": {
      base00: "#ffffff",
      base01: "#e0e0e0",
      base02: "#d0d0d0",
      base03: "#b0b0b0",
      base04: "#000000",
      base05: "#101010",
      base06: "#151515",
      base07: "#202020",
      base08: "#ff0086",
      base09: "#fd8900",
      base0A: "#aba800",
      base0B: "#00c918",
      base0C: "#1faaaa",
      base0D: "#3777e6",
      base0E: "#ad00a1",
      base0F: "#cc6633"
    },
    "tomorrow-night": {
      base00: "#1d1f21",
      base01: "#282a2e",
      base02: "#373b41",
      base03: "#969896",
      base04: "#b4b7b4",
      base05: "#c5c8c6",
      base06: "#e0e0e0",
      base07: "#ffffff",
      base08: "#cc6666",
      base09: "#de935f",
      base0A: "#f0c674",
      base0B: "#b5bd68",
      base0C: "#8abeb7",
      base0D: "#81a2be",
      base0E: "#b294bb",
      base0F: "#a3685a"
    },
    tomorrow: {
      base00: "#ffffff",
      base01: "#e0e0e0",
      base02: "#d6d6d6",
      base03: "#8e908c",
      base04: "#969896",
      base05: "#4d4d4c",
      base06: "#282a2e",
      base07: "#1d1f21",
      base08: "#c82829",
      base09: "#f5871f",
      base0A: "#eab700",
      base0B: "#718c00",
      base0C: "#3e999f",
      base0D: "#4271ae",
      base0E: "#8959a8",
      base0F: "#a3685a"
    },
    tube: {
      base00: "#231f20",
      base01: "#1c3f95",
      base02: "#5a5758",
      base03: "#737171",
      base04: "#959ca1",
      base05: "#d9d8d8",
      base06: "#e7e7e8",
      base07: "#ffffff",
      base08: "#ee2e24",
      base09: "#f386a1",
      base0A: "#ffd204",
      base0B: "#00853e",
      base0C: "#85cebc",
      base0D: "#009ddc",
      base0E: "#98005d",
      base0F: "#b06110"
    },
    twilight: {
      base00: "#1e1e1e",
      base01: "#323537",
      base02: "#464b50",
      base03: "#5f5a60",
      base04: "#838184",
      base05: "#a7a7a7",
      base06: "#c3c3c3",
      base07: "#ffffff",
      base08: "#cf6a4c",
      base09: "#cda869",
      base0A: "#f9ee98",
      base0B: "#8f9d6a",
      base0C: "#afc4db",
      base0D: "#7587a6",
      base0E: "#9b859d",
      base0F: "#9b703f"
    },
    woodland: {
      base00: "#231e18",
      base01: "#302b25",
      base02: "#48413a",
      base03: "#9d8b70",
      base04: "#b4a490",
      base05: "#cabcb1",
      base06: "#d7c8bc",
      base07: "#e4d4c8",
      base08: "#d35c5c",
      base09: "#ca7f32",
      base0A: "#e0ac16",
      base0B: "#b7ba53",
      base0C: "#6eb958",
      base0D: "#88a4d3",
      base0E: "#bb90e2",
      base0F: "#b49368"
    },
    zenburn: {
      base00: "#383838",
      base01: "#404040",
      base02: "#606060",
      base03: "#6f6f6f",
      base04: "#808080",
      base05: "#dcdccc",
      base06: "#c0c0c0",
      base07: "#ffffff",
      base08: "#dca3a3",
      base09: "#dfaf8f",
      base0A: "#e0cf9f",
      base0B: "#5f7f5f",
      base0C: "#93e0e3",
      base0D: "#7cb8bb",
      base0E: "#dc8cc3",
      base0F: "#000000"
    }
  };
  var availableThemes = Object.keys(themes);
  var themeStyles = (nameOrObject) => {
    let theme;
    if (typeof nameOrObject === "string") {
      if (themes[nameOrObject] === void 0) {
        throw new Error(`${nameOrObject} not found`);
      }
      theme = themes[nameOrObject];
    } else {
      theme = nameOrObject;
    }
    return `.container{${Object.keys(theme).map((key) => `--${key}: ${theme[key]};`).join("")}}`;
  };

  // src/data-helpers.js
  var isUrl = (string) => {
    try {
      return Boolean(new URL(string));
    } catch (e) {
      return false;
    }
  };
  var dataType = (data) => {
    if (Array.isArray(data))
      return "array";
    if (data === null)
      return "null";
    if (data instanceof RegExp)
      return "regexp";
    const type = typeof data;
    if (type === "number") {
      if (isNaN(data))
        return "NaN";
      if (!isFinite(data))
        return "Infinity";
      return Number.isInteger(data) ? "int" : "float";
    }
    if (type === "boolean")
      return "bool";
    if (type === "object" && data instanceof Date) {
      return "date";
    }
    return type;
  };

  // src/validator.js
  var validateBoolean = (value) => {
    if (typeof value === "boolean")
      return value;
    if (value === "true")
      return true;
    else if (value === "false")
      return false;
    throw new Error(`should be a boolean!`);
  };
  var validateString = (value) => {
    if (typeof value === "string")
      return value;
    throw new Error(`should be a string!`);
  };
  var validatePositiveNumber = (value) => {
    if (typeof value === "number" && value >= 0)
      return value;
    if (typeof value === "string") {
      value = parseFloat(value);
    }
    if (isNaN(value) || value < 0) {
      throw new Error(`should be a positive number!`);
    }
    return value;
  };
  var validateBooleanOrPositiveNumber = (value) => {
    if (typeof value === "boolean")
      return value;
    if (typeof value === "number")
      return value;
    if (value === "true")
      return true;
    else if (value === "false")
      return false;
    else if (typeof value === "string") {
      value = parseFloat(value);
      if (!isNaN(value) && value >= 0)
        return value;
    }
    throw new Error(`should be a boolean or a positive number!`);
  };
  var validateStringOrJson = (value) => {
    if (typeof value === "object")
      return value;
    if (typeof value === "string") {
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    }
    throw new Error(`should be a string or JSON!`);
  };

  // src/renderer/data-row.js
  var DataRow = function({
    key,
    value,
    expanded,
    indent,
    searchTerm,
    onToggleExpand,
    level = 0
  }) {
    const row = document.createElement("div");
    this.maxLevel = level;
    const thisDataType = dataType(value);
    const hasChildren = thisDataType === "array" || thisDataType === "object";
    let isExpanded = expanded === true || expanded > level;
    let expandIcon, childrenRows, keyEl, valueEl;
    row.className = `data-row ${isExpanded ? "expanded" : ""}`;
    row.dataset.key = key;
    row.dataset.level = level;
    if (level > 0)
      row.style.paddingLeft = `${indent * 5}px`;
    const keyValueWrapper = document.createElement("span");
    keyValueWrapper.className = "key-value-wrapper";
    row.appendChild(keyValueWrapper);
    const toggleExpand = () => {
      row.classList.toggle("expanded");
      if (onToggleExpand) {
        if (row.classList.contains("expanded")) {
          onToggleExpand(level + 1);
        } else {
          onToggleExpand(level);
        }
      }
    };
    if (hasChildren) {
      const expandIconWrapper = document.createElement("span");
      expandIconWrapper.className = "icon-wrapper";
      keyValueWrapper.appendChild(expandIconWrapper);
      expandIcon = document.createElement("span");
      expandIcon.className = `expand icon clickable`;
      expandIcon.setAttribute("title", isExpanded ? "Collapse" : "Expand");
      expandIconWrapper.appendChild(expandIcon);
      expandIcon.addEventListener("click", () => toggleExpand());
    }
    if (key !== null && key !== "") {
      const keyDataType = typeof key;
      keyEl = document.createElement("span");
      keyEl.className = `key clickable ${keyDataType === "number" ? "number" : ""}`;
      keyEl.textContent = keyDataType === "number" ? key : `"${key}"`;
      keyEl.addEventListener("click", () => toggleExpand());
      keyValueWrapper.appendChild(keyEl);
      const colonEl = document.createElement("span");
      colonEl.classList.add("colon");
      colonEl.textContent = ":";
      keyValueWrapper.appendChild(colonEl);
    }
    if (hasChildren) {
      const openingParenthesis = document.createElement("span");
      openingParenthesis.className = "opening-parenthesis";
      openingParenthesis.textContent = thisDataType === "array" ? "[" : "{";
      keyValueWrapper.appendChild(openingParenthesis);
      const ellipsis = document.createElement("span");
      ellipsis.className = "ellipsis clickable";
      ellipsis.textContent = "...";
      ellipsis.addEventListener("click", () => toggleExpand());
      keyValueWrapper.appendChild(ellipsis);
      const closingParenthesis = document.createElement("span");
      closingParenthesis.className = "closing-parenthesis";
      closingParenthesis.textContent = thisDataType === "array" ? "]" : "}";
      keyValueWrapper.appendChild(closingParenthesis);
      const itemsSize = document.createElement("span");
      itemsSize.className = "items-size";
      itemsSize.textContent = `${thisDataType === "array" ? value.length : Object.keys(value).length} items`;
      keyValueWrapper.appendChild(itemsSize);
      childrenRows = [];
      const items = thisDataType === "array" ? value.map((v, i) => i) : Object.keys(value);
      items.forEach((key2) => {
        const subRow = new DataRow({
          key: key2,
          value: value[key2],
          expanded,
          indent,
          onToggleExpand,
          level: level + 1
        });
        childrenRows.push(subRow);
        row.appendChild(subRow.element);
        this.maxLevel = Math.max(this.maxLevel, subRow.maxLevel);
      });
      const expandedClosingParenthesis = document.createElement("span");
      expandedClosingParenthesis.className = "closing-parenthesis";
      expandedClosingParenthesis.textContent = thisDataType === "array" ? "]" : "}";
      row.appendChild(expandedClosingParenthesis);
    } else {
      let valueType = null;
      if (!["nan", "NaN", "undefined", "null"].includes(thisDataType)) {
        valueType = document.createElement("span");
        valueType.className = `type`;
        valueType.innerText = thisDataType.toLowerCase();
      }
      const valueWrapper = document.createElement("span");
      valueWrapper.className = `value ${thisDataType.toLowerCase()}`;
      valueEl = document.createElement("span");
      valueEl.innerText = thisDataType === "string" ? `"${value}"` : value;
      if (valueType)
        valueWrapper.appendChild(valueType);
      valueWrapper.appendChild(valueEl);
      keyValueWrapper.appendChild(valueWrapper);
    }
    const copyIcon = document.createElement("span");
    copyIcon.className = "copy icon";
    copyIcon.setAttribute("title", "Copy to clipboard");
    copyIcon.addEventListener("click", () => {
      navigator.clipboard.writeText(JSON.stringify(value, null, indent));
    });
    const copyIconWrapper = document.createElement("span");
    copyIconWrapper.className = "icon-wrapper";
    copyIconWrapper.appendChild(copyIcon);
    keyValueWrapper.appendChild(copyIconWrapper);
    const search = (searchTerm2) => {
      if (keyEl) {
        const keyString = keyEl.textContent;
        keyEl.innerHTML = keyString;
        const keyIndex = keyString.indexOf(searchTerm2);
        if (keyIndex > -1) {
          keyEl.innerHTML = keyString.slice(0, keyIndex) + `<span class="match">${keyString.slice(
            keyIndex,
            keyIndex + searchTerm2.length
          )}</span>${keyString.slice(keyIndex + searchTerm2.length)}`;
        }
      }
      if (valueEl) {
        const valueString = valueEl.textContent;
        valueEl.innerHTML = valueString;
        const valueIndex = valueString.indexOf(searchTerm2);
        if (valueIndex > -1) {
          valueEl.innerHTML = valueString.slice(0, valueIndex) + `<span class="match">${valueString.slice(
            valueIndex,
            valueIndex + searchTerm2.length
          )}</span>${valueString.slice(valueIndex + searchTerm2.length)}`;
        }
      }
    };
    this.update = ({ expanded: expanded2, indent: indent2, searchTerm: searchTerm2 }) => {
      if (indent2 !== void 0 && level > 0) {
        row.style.paddingLeft = `${indent2 * 5}px`;
      }
      if (expanded2 !== void 0) {
        isExpanded = expanded2 === true || expanded2 > level;
        row.classList.toggle("expanded", isExpanded);
        if (expandIcon)
          expandIcon.title = isExpanded ? "Collapse" : "Expand";
      }
      if (searchTerm2 !== void 0 && searchTerm2 !== null) {
        search(searchTerm2);
      }
      if (childrenRows)
        childrenRows.forEach((r) => r.update({ expanded: expanded2, indent: indent2, searchTerm: searchTerm2 }));
    };
    this.element = row;
  };
  var data_row_default = DataRow;

  // src/renderer/toolbar.js
  var Toolbar = function({
    expanded,
    indent,
    onChange,
    onSearch,
    showDetails
  }) {
    this.indent = indent || 2;
    this.expanded = typeof expanded === "number" ? expanded : 2;
    this.showDetails = showDetails || true;
    this.maxExpandLevel = 0;
    let searchInput;
    const toolbar = document.createElement("div");
    toolbar.className = "toolbar";
    const options = document.createElement("div");
    options.className = "options";
    toolbar.appendChild(options);
    const searchWrapper = document.createElement("div");
    searchWrapper.className = "search-wrapper";
    toolbar.appendChild(searchWrapper);
    const refreshIconWrapper = document.createElement("div");
    refreshIconWrapper.className = "icon-wrapper clickable";
    options.appendChild(refreshIconWrapper);
    const refreshIcon = document.createElement("span");
    refreshIcon.className = "icon refresh";
    refreshIconWrapper.onclick = () => this.refresh();
    refreshIconWrapper.appendChild(refreshIcon);
    const expandIconWrapper = document.createElement("div");
    expandIconWrapper.className = "icon-wrapper clickable";
    options.appendChild(expandIconWrapper);
    const expandIcon = document.createElement("span");
    expandIcon.className = "icon plus";
    expandIconWrapper.appendChild(expandIcon);
    expandIconWrapper.onclick = () => {
      if (this.expanded < this.maxExpandLevel)
        this.expanded += 1;
      onChange({ expanded: this.expanded });
    };
    const collapseIconWrapper = document.createElement("div");
    collapseIconWrapper.className = "icon-wrapper clickable";
    options.appendChild(collapseIconWrapper);
    const collapseIcon = document.createElement("span");
    collapseIcon.className = "icon minus";
    collapseIconWrapper.appendChild(collapseIcon);
    collapseIconWrapper.onclick = () => {
      if (this.expanded > this.maxExpandLevel)
        this.expanded = this.maxExpandLevel;
      if (this.expanded > 0)
        this.expanded -= 1;
      onChange({ expanded: this.expanded });
    };
    const indentIconWrapper = document.createElement("div");
    indentIconWrapper.className = "icon-wrapper clickable";
    options.appendChild(indentIconWrapper);
    const indentIcon = document.createElement("span");
    indentIcon.className = "icon indent";
    indentIconWrapper.onclick = () => {
      this.indent += 1;
      onChange({ indent: this.indent });
    };
    indentIconWrapper.appendChild(indentIcon);
    const outdentIconWrapper = document.createElement("div");
    outdentIconWrapper.className = "icon-wrapper clickable";
    options.appendChild(outdentIconWrapper);
    const outdentIcon = document.createElement("span");
    outdentIcon.className = "icon outdent";
    outdentIconWrapper.onclick = () => {
      this.indent -= 1;
      onChange({ indent: this.indent });
    };
    outdentIconWrapper.appendChild(outdentIcon);
    const infoIconWrapper = document.createElement("div");
    infoIconWrapper.className = "icon-wrapper clickable";
    options.appendChild(infoIconWrapper);
    const infoIcon = document.createElement("span");
    infoIcon.className = `icon info ${this.showDetails ? "active" : ""}`;
    infoIconWrapper.onclick = () => {
      infoIcon.classList.toggle("active");
      this.showDetails = !this.showDetails;
      onChange({
        showCopy: this.showDetails,
        showDataTypes: this.showDetails,
        showSize: this.showDetails
      });
    };
    infoIconWrapper.appendChild(infoIcon);
    const searchIcon = document.createElement("span");
    searchIcon.className = "icon search";
    searchWrapper.appendChild(searchIcon);
    searchInput = document.createElement("input");
    searchInput.className = "search-input";
    searchInput.placeholder = "Search";
    searchInput.oninput = (e) => {
      onSearch(e.target.value);
    };
    searchWrapper.appendChild(searchInput);
    this.refresh = () => {
      this.expanded = 1;
      this.indent = 2;
      if (searchInput)
        searchInput.value = "";
      onChange({ indent: 2, expanded: 1 });
      onSearch("");
    };
    this.element = toolbar;
  };
  var toolbar_default = Toolbar;

  // src/renderer/container.js
  function Container(root, options = {}) {
    const containerElem = document.createElement("div");
    containerElem.className = "container";
    root.appendChild(containerElem);
    let dataRow = null;
    let toolbar = null;
    const cache = {};
    const update = ({
      data,
      expanded,
      indent,
      expandIconType,
      showDataTypes,
      showToolbar,
      showSize,
      showCopy
    }) => {
      if (data) {
        const newDataCompareString = JSON.stringify(data);
        if (cache.dataComapreString !== newDataCompareString) {
          cache.dataComapreString = newDataCompareString;
          dataRow = new data_row_default({
            key: "",
            value: data,
            expanded,
            indent,
            onToggleExpand: (level) => {
              if (toolbar)
                toolbar.expanded = level;
              cache.expanded = level;
            }
          });
          containerElem.replaceChildren(dataRow.element);
          if (cache.showToolbar && toolbar) {
            containerElem.prepend(toolbar.element);
            toolbar.maxExpandLevel = dataRow.maxLevel;
            toolbar.refresh();
          }
        }
      }
      if (showToolbar !== void 0 && cache.showToolbar !== showToolbar) {
        cache.showToolbar = showToolbar;
        if (showToolbar) {
          if (!toolbar)
            toolbar = new toolbar_default({
              expanded: cache.expanded,
              indent: cache.indent,
              onChange: update,
              onSearch: (searchTerm) => {
                if (dataRow)
                  dataRow.update({ searchTerm });
              }
            });
          if (dataRow)
            toolbar.maxExpandLevel = dataRow.maxLevel;
          containerElem.prepend(toolbar.element);
        } else {
          const element = containerElem.querySelector(".toolbar");
          if (element)
            element.remove();
        }
      }
      const propsToBeUpdated = {};
      if (expanded !== void 0 && cache.expanded !== expanded) {
        cache.expanded = expanded;
        propsToBeUpdated.expanded = expanded;
      }
      if (indent !== void 0 && cache.indent !== indent) {
        cache.indent = indent;
        propsToBeUpdated.indent = indent;
      }
      if (Object.keys(propsToBeUpdated).length > 0 && dataRow) {
        dataRow.update(propsToBeUpdated);
      }
      if (showCopy !== void 0 && cache.showCopy !== showCopy) {
        cache.showCopy = showCopy;
        containerElem.classList.toggle("show-copy", showCopy);
      }
      if (showSize !== void 0 && cache.showSize !== showSize) {
        cache.showSize = showSize;
        containerElem.classList.toggle("show-size", showSize);
      }
      if (showDataTypes !== void 0 && cache.showDataTypes !== showDataTypes) {
        cache.showDataTypes = showDataTypes;
        containerElem.classList.toggle("show-data-types", showDataTypes);
      }
      if (expandIconType !== void 0 && cache.expandIconType !== expandIconType) {
        containerElem.classList.add(`expand-icon-${expandIconType}`);
        containerElem.classList.remove(`expand-icon-${cache.expandIconType}`);
        cache.expandIconType = expandIconType;
      }
    };
    update(options);
    this.update = update;
  }
  var container_default = Container;

  // src/component.js
  var DEFAULT_PARAMS = {
    indent: 2,
    expanded: 1,
    theme: "default-light",
    showDataTypes: true,
    showToolbar: false,
    expandIconType: "arrow",
    showCopy: true,
    showSize: true,
    data: null
  };
  var _themeStylesContainer, _options, _contentData, _renderer, _warn, _validateAndUpdate, _render;
  var _JsonViewer = class extends HTMLElement {
    constructor() {
      super();
      __privateAdd(this, _themeStylesContainer, void 0);
      __privateAdd(this, _options, void 0);
      __privateAdd(this, _contentData, void 0);
      __privateAdd(this, _renderer, void 0);
      __privateAdd(this, _warn, (...args) => {
        console.warn(`JsonViewer${this.id ? ` (${this.id})` : ""}:`, ...args);
      });
      __privateAdd(this, _validateAndUpdate, (propName, value, validatorFunc, allowedValues) => {
        try {
          value = validatorFunc(value);
          if (allowedValues && !allowedValues.includes(value)) {
            throw new Error(`should be one of ${allowedValues.join(", ")}`);
          }
          if (__privateGet(this, _options)[propName] === value)
            return;
          __privateGet(this, _options)[propName] = value;
          __privateGet(this, _render).call(this);
        } catch (e) {
          __privateGet(this, _warn).call(this, `Attribute ${propName}: ${e.message}`);
        }
      });
      __privateAdd(this, _render, () => {
        __privateGet(this, _renderer).update({
          data: __privateGet(this, _contentData),
          expanded: __privateGet(this, _options).expanded,
          expandIconType: __privateGet(this, _options).expandIconType,
          indent: __privateGet(this, _options).indent,
          showDataTypes: __privateGet(this, _options).showDataTypes,
          showToolbar: __privateGet(this, _options).showToolbar,
          showSize: __privateGet(this, _options).showSize,
          showCopy: __privateGet(this, _options).showCopy
        });
      });
      __privateSet(this, _options, { ...DEFAULT_PARAMS });
      __privateSet(this, _themeStylesContainer, document.createElement("style"));
      const shadowRoot = this.attachShadow({ mode: "open" });
      const basicStyles = document.createElement("style");
      basicStyles.textContent = `${styles_default}`;
      shadowRoot.appendChild(basicStyles);
      shadowRoot.appendChild(__privateGet(this, _themeStylesContainer));
      this.theme = __privateGet(this, _options).theme;
      __privateSet(this, _renderer, new container_default(shadowRoot, __privateGet(this, _options)));
    }
    // component attributes
    static get observedAttributes() {
      return Object.keys(DEFAULT_PARAMS).map(
        (k) => k.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()
      );
    }
    set showDataTypes(value) {
      __privateGet(this, _validateAndUpdate).call(this, "showDataTypes", value, validateBoolean);
    }
    set showToolbar(value) {
      __privateGet(this, _validateAndUpdate).call(this, "showToolbar", value, validateBoolean);
    }
    set indent(newIndent) {
      __privateGet(this, _validateAndUpdate).call(this, "indent", newIndent, validatePositiveNumber);
    }
    set expandIconType(name) {
      __privateGet(this, _validateAndUpdate).call(this, "expandIconType", name, validateString, [
        "arrow",
        "square",
        "circle"
      ]);
    }
    set expanded(newExpanded) {
      __privateGet(this, _validateAndUpdate).call(this, "expanded", newExpanded, validateBooleanOrPositiveNumber);
    }
    set showSize(newShowSize) {
      __privateGet(this, _validateAndUpdate).call(this, "showSize", newShowSize, validateBoolean);
    }
    set showCopy(showCopy) {
      __privateGet(this, _validateAndUpdate).call(this, "showCopy", showCopy, validateBoolean);
    }
    // validate and set theme
    // theme can be a string or an object
    // validationg theme is more complex than other attributes
    set theme(newTheme) {
      try {
        newTheme = validateStringOrJson(newTheme);
        if (__privateGet(this, _options).theme === newTheme && __privateGet(this, _themeStylesContainer).textContent !== "")
          return;
        __privateGet(this, _themeStylesContainer).textContent = themeStyles(newTheme);
        __privateGet(this, _options).theme = newTheme;
      } catch (e) {
        __privateGet(this, _warn).call(this, `Attribute theme: ${e.message}`);
      }
    }
    // validate and set data
    // data can be a string or an object
    // validating data is more complex than other attributes
    set data(newData) {
      try {
        newData = validateStringOrJson(newData);
        const newDataString = JSON.stringify(newData);
        if (__privateGet(this, _options).data === newDataString)
          return;
        __privateGet(this, _options).data = newDataString;
        if (isUrl(newData)) {
          fetch(newData).then((r) => r.json()).then((data) => {
            __privateSet(this, _contentData, data);
            __privateGet(this, _render).call(this);
          });
        } else {
          __privateSet(this, _contentData, newData);
          __privateGet(this, _render).call(this);
        }
      } catch (e) {
        __privateGet(this, _warn).call(this, `Attribute data: ${e.message}`);
      }
    }
    get options() {
      return __privateGet(this, _options);
    }
    connectedCallback() {
      window.addEventListener("DOMContentLoaded", () => {
        const data = this.textContent;
        this.textContent = "";
        if (data)
          this.data = data;
      });
    }
    attributeChangedCallback(name, oldValue, newValue) {
      if (_JsonViewer.allowedAttributes.indexOf(name) > -1) {
        const propName = name.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        this[propName] = newValue;
      } else {
        __privateGet(this, _warn).call(this, `Attribute ${name} is not supported and will be ignored!`);
        this.removeAttribute(name);
      }
    }
  };
  var JsonViewer = _JsonViewer;
  _themeStylesContainer = new WeakMap();
  _options = new WeakMap();
  _contentData = new WeakMap();
  _renderer = new WeakMap();
  _warn = new WeakMap();
  _validateAndUpdate = new WeakMap();
  _render = new WeakMap();
  __publicField(JsonViewer, "allowedAttributes", ["id"].concat(_JsonViewer.observedAttributes));
  customElements.define("json-viewer", JsonViewer);
})();
