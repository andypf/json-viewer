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
    apathy: [
      "#031a16",
      "#0b342d",
      "#184e45",
      "#2b685e",
      "#5f9c92",
      "#81b5ac",
      "#a7cec8",
      "#d2e7e4",
      "#3e9688",
      "#3e7996",
      "#3e4c96",
      "#883e96",
      "#963e4c",
      "#96883e",
      "#4c963e",
      "#3e965b"
    ],
    ashes: [
      "#1c2023",
      "#393f45",
      "#565e65",
      "#747c84",
      "#adb3ba",
      "#c7ccd1",
      "#dfe2e5",
      "#f3f4f5",
      "#c7ae95",
      "#c7c795",
      "#aec795",
      "#95c7ae",
      "#95aec7",
      "#ae95c7",
      "#c795ae",
      "#c79595"
    ],
    "atelier-dune-light": [
      "#fefbec",
      "#e8e4cf",
      "#a6a28c",
      "#999580",
      "#7d7a68",
      "#6e6b5e",
      "#292824",
      "#20201d",
      "#d73737",
      "#b65611",
      "#ae9513",
      "#60ac39",
      "#1fad83",
      "#6684e1",
      "#b854d4",
      "#d43552"
    ],
    "atelier-dune": [
      "#20201d",
      "#292824",
      "#6e6b5e",
      "#7d7a68",
      "#999580",
      "#a6a28c",
      "#e8e4cf",
      "#fefbec",
      "#d73737",
      "#b65611",
      "#ae9513",
      "#60ac39",
      "#1fad83",
      "#6684e1",
      "#b854d4",
      "#d43552"
    ],
    atlas: [
      "#002635",
      "#00384d",
      "#517f8d",
      "#6c8b91",
      "#869696",
      "#a1a19a",
      "#e6e6dc",
      "#fafaf8",
      "#ff5a67",
      "#f08e48",
      "#ffcc1b",
      "#7fc06e",
      "#14747e",
      "#5dd7b9",
      "#9a70a4",
      "#c43060"
    ],
    bespin: [
      "#28211c",
      "#36312e",
      "#5e5d5c",
      "#666666",
      "#797977",
      "#8a8986",
      "#9d9b97",
      "#baae9e",
      "#cf6a4c",
      "#cf7d34",
      "#f9ee98",
      "#54be0d",
      "#afc4db",
      "#5ea6ea",
      "#9b859d",
      "#937121"
    ],
    "black-metal": [
      "#000000",
      "#121212",
      "#222222",
      "#333333",
      "#999999",
      "#c1c1c1",
      "#999999",
      "#c1c1c1",
      "#5f8787",
      "#aaaaaa",
      "#a06666",
      "#dd9999",
      "#aaaaaa",
      "#888888",
      "#999999",
      "#444444"
    ],
    brewer: [
      "#0c0d0e",
      "#2e2f30",
      "#515253",
      "#737475",
      "#959697",
      "#b7b8b9",
      "#dadbdc",
      "#fcfdfe",
      "#e31a1c",
      "#e6550d",
      "#dca060",
      "#31a354",
      "#80b1d3",
      "#3182bd",
      "#756bb1",
      "#b15928"
    ],
    bright: [
      "#000000",
      "#303030",
      "#505050",
      "#b0b0b0",
      "#d0d0d0",
      "#e0e0e0",
      "#f5f5f5",
      "#ffffff",
      "#fb0120",
      "#fc6d24",
      "#fda331",
      "#a1c659",
      "#76c7b7",
      "#6fb3d2",
      "#d381c3",
      "#be643c"
    ],
    brogrammer: [
      "#1f1f1f",
      "#f81118",
      "#2dc55e",
      "#ecba0f",
      "#2a84d2",
      "#4e5ab7",
      "#1081d6",
      "#d6dbe5",
      "#d6dbe5",
      "#de352e",
      "#1dd361",
      "#f3bd09",
      "#1081d6",
      "#5350b9",
      "#0f7ddb",
      "#ffffff"
    ],
    "brushtrees-dark": [
      "#485867",
      "#5a6d7a",
      "#6d828e",
      "#8299a1",
      "#98afb5",
      "#b0c5c8",
      "#c9dbdc",
      "#e3efef",
      "#b38686",
      "#d8bba2",
      "#aab386",
      "#87b386",
      "#86b3b3",
      "#868cb3",
      "#b386b2",
      "#b39f9f"
    ],
    brushtrees: [
      "#e3efef",
      "#c9dbdc",
      "#b0c5c8",
      "#98afb5",
      "#8299a1",
      "#6d828e",
      "#5a6d7a",
      "#485867",
      "#b38686",
      "#d8bba2",
      "#aab386",
      "#87b386",
      "#86b3b3",
      "#868cb3",
      "#b386b2",
      "#b39f9f"
    ],
    chalk: [
      "#151515",
      "#202020",
      "#303030",
      "#505050",
      "#b0b0b0",
      "#d0d0d0",
      "#e0e0e0",
      "#f5f5f5",
      "#fb9fb1",
      "#eda987",
      "#ddb26f",
      "#acc267",
      "#12cfc0",
      "#6fc2ef",
      "#e1a3ee",
      "#deaf8f"
    ],
    circus: [
      "#191919",
      "#202020",
      "#303030",
      "#5f5a60",
      "#505050",
      "#a7a7a7",
      "#808080",
      "#ffffff",
      "#dc657d",
      "#4bb1a7",
      "#c3ba63",
      "#84b97c",
      "#4bb1a7",
      "#639ee4",
      "#b888e2",
      "#b888e2"
    ],
    "classic-dark": [
      "#151515",
      "#202020",
      "#303030",
      "#505050",
      "#b0b0b0",
      "#d0d0d0",
      "#e0e0e0",
      "#f5f5f5",
      "#ac4142",
      "#d28445",
      "#f4bf75",
      "#90a959",
      "#75b5aa",
      "#6a9fb5",
      "#aa759f",
      "#8f5536"
    ],
    "classic-light": [
      "#f5f5f5",
      "#e0e0e0",
      "#d0d0d0",
      "#b0b0b0",
      "#505050",
      "#303030",
      "#202020",
      "#151515",
      "#ac4142",
      "#d28445",
      "#f4bf75",
      "#90a959",
      "#75b5aa",
      "#6a9fb5",
      "#aa759f",
      "#8f5536"
    ],
    codeschool: [
      "#232c31",
      "#1c3657",
      "#2a343a",
      "#3f4944",
      "#84898c",
      "#9ea7a6",
      "#a7cfa3",
      "#b5d8f6",
      "#2a5491",
      "#43820d",
      "#a03b1e",
      "#237986",
      "#b02f30",
      "#484d79",
      "#c59820",
      "#c98344"
    ],
    cupcake: [
      "#fbf1f2",
      "#f2f1f4",
      "#d8d5dd",
      "#bfb9c6",
      "#a59daf",
      "#8b8198",
      "#72677e",
      "#585062",
      "#d57e85",
      "#ebb790",
      "#dcb16c",
      "#a3b367",
      "#69a9a7",
      "#7297b9",
      "#bb99b4",
      "#baa58c"
    ],
    cupertino: [
      "#ffffff",
      "#c0c0c0",
      "#c0c0c0",
      "#808080",
      "#808080",
      "#404040",
      "#404040",
      "#5e5e5e",
      "#c41a15",
      "#eb8500",
      "#826b28",
      "#007400",
      "#318495",
      "#0000ff",
      "#a90d91",
      "#826b28"
    ],
    darcula: [
      "#2b2b2b",
      "#323232",
      "#323232",
      "#606366",
      "#a4a3a3",
      "#a9b7c6",
      "#ffc66d",
      "#ffffff",
      "#4eade5",
      "#689757",
      "#bbb529",
      "#6a8759",
      "#629755",
      "#9876aa",
      "#cc7832",
      "#808080"
    ],
    darktooth: [
      "#1d2021",
      "#32302f",
      "#504945",
      "#665c54",
      "#928374",
      "#a89984",
      "#d5c4a1",
      "#fdf4c1",
      "#fb543f",
      "#fe8625",
      "#fac03b",
      "#95c085",
      "#8ba59b",
      "#0d6678",
      "#8f4673",
      "#a87322"
    ],
    "default-dark": [
      "#181818",
      "#282828",
      "#383838",
      "#585858",
      "#b8b8b8",
      "#d8d8d8",
      "#e8e8e8",
      "#f8f8f8",
      "#ab4642",
      "#dc9656",
      "#f7ca88",
      "#a1b56c",
      "#86c1b9",
      "#7cafc2",
      "#ba8baf",
      "#a16946"
    ],
    "default-light": [
      "#ffffff",
      "#e8e8e8",
      "#d8d8d8",
      "#b8b8b8",
      "#585858",
      "#383838",
      "#282828",
      "#181818",
      "#ab4642",
      "#dc9656",
      "#ab4642",
      "#a1b56c",
      "#86c1b9",
      "#7cafc2",
      "#ba8baf",
      "#a16946"
    ],
    dracula: [
      "#282936",
      "#3a3c4e",
      "#4d4f68",
      "#626483",
      "#62d6e8",
      "#e9e9f4",
      "#f1f2f8",
      "#f7f7fb",
      "#ea51b2",
      "#b45bcf",
      "#00f769",
      "#ebff87",
      "#a1efe4",
      "#62d6e8",
      "#b45bcf",
      "#00f769"
    ],
    eighties: [
      "#2d2d2d",
      "#393939",
      "#515151",
      "#747369",
      "#a09f93",
      "#d3d0c8",
      "#e8e6df",
      "#f2f0ec",
      "#f2777a",
      "#f99157",
      "#ffcc66",
      "#99cc99",
      "#66cccc",
      "#6699cc",
      "#cc99cc",
      "#d27b53"
    ],
    embers: [
      "#16130f",
      "#2c2620",
      "#433b32",
      "#5a5047",
      "#8a8075",
      "#a39a90",
      "#beb6ae",
      "#dbd6d1",
      "#826d57",
      "#828257",
      "#6d8257",
      "#57826d",
      "#576d82",
      "#6d5782",
      "#82576d",
      "#825757"
    ],
    flat: [
      "#2c3e50",
      "#34495e",
      "#7f8c8d",
      "#95a5a6",
      "#bdc3c7",
      "#e0e0e0",
      "#f5f5f5",
      "#ecf0f1",
      "#e74c3c",
      "#e67e22",
      "#f1c40f",
      "#2ecc71",
      "#1abc9c",
      "#3498db",
      "#9b59b6",
      "#be643c"
    ],
    "fruit-soda": [
      "#f1ecf1",
      "#e0dee0",
      "#d8d5d5",
      "#b5b4b6",
      "#979598",
      "#515151",
      "#474545",
      "#2d2c2c",
      "#fe3e31",
      "#fe6d08",
      "#f7e203",
      "#47f74c",
      "#0f9cfd",
      "#2931df",
      "#611fce",
      "#b16f40"
    ],
    github: [
      "#ffffff",
      "#f5f5f5",
      "#c8c8fa",
      "#969896",
      "#e8e8e8",
      "#333333",
      "#ffffff",
      "#ffffff",
      "#ed6a43",
      "#0086b3",
      "#795da3",
      "#183691",
      "#183691",
      "#795da3",
      "#a71d5d",
      "#333333"
    ],
    "google-dark": [
      "#1d1f21",
      "#282a2e",
      "#373b41",
      "#969896",
      "#b4b7b4",
      "#c5c8c6",
      "#e0e0e0",
      "#ffffff",
      "#cc342b",
      "#f96a38",
      "#fba922",
      "#198844",
      "#3971ed",
      "#3971ed",
      "#a36ac7",
      "#3971ed"
    ],
    "google-light": [
      "#ffffff",
      "#e0e0e0",
      "#c5c8c6",
      "#b4b7b4",
      "#969896",
      "#373b41",
      "#282a2e",
      "#1d1f21",
      "#cc342b",
      "#f96a38",
      "#fba922",
      "#198844",
      "#3971ed",
      "#3971ed",
      "#a36ac7",
      "#3971ed"
    ],
    "grayscale-dark": [
      "#101010",
      "#252525",
      "#464646",
      "#525252",
      "#ababab",
      "#b9b9b9",
      "#e3e3e3",
      "#f7f7f7",
      "#7c7c7c",
      "#999999",
      "#a0a0a0",
      "#8e8e8e",
      "#868686",
      "#686868",
      "#747474",
      "#5e5e5e"
    ],
    "grayscale-light": [
      "#f7f7f7",
      "#e3e3e3",
      "#b9b9b9",
      "#ababab",
      "#525252",
      "#464646",
      "#252525",
      "#101010",
      "#7c7c7c",
      "#999999",
      "#a0a0a0",
      "#8e8e8e",
      "#868686",
      "#686868",
      "#747474",
      "#5e5e5e"
    ],
    greenscreen: [
      "#001100",
      "#003300",
      "#005500",
      "#007700",
      "#009900",
      "#00bb00",
      "#00dd00",
      "#00ff00",
      "#007700",
      "#009900",
      "#007700",
      "#00bb00",
      "#005500",
      "#009900",
      "#00bb00",
      "#005500"
    ],
    "gruvbox-dark-hard": [
      "#1d2021",
      "#3c3836",
      "#504945",
      "#665c54",
      "#bdae93",
      "#d5c4a1",
      "#ebdbb2",
      "#fbf1c7",
      "#fb4934",
      "#fe8019",
      "#fabd2f",
      "#b8bb26",
      "#8ec07c",
      "#83a598",
      "#d3869b",
      "#d65d0e"
    ],
    "gruvbox-light-hard": [
      "#f9f5d7",
      "#ebdbb2",
      "#d5c4a1",
      "#bdae93",
      "#665c54",
      "#504945",
      "#3c3836",
      "#282828",
      "#9d0006",
      "#af3a03",
      "#b57614",
      "#79740e",
      "#427b58",
      "#076678",
      "#8f3f71",
      "#d65d0e"
    ],
    "harmonic-dark": [
      "#0b1c2c",
      "#223b54",
      "#405c79",
      "#627e99",
      "#aabcce",
      "#cbd6e2",
      "#e5ebf1",
      "#f7f9fb",
      "#bf8b56",
      "#bfbf56",
      "#8bbf56",
      "#56bf8b",
      "#568bbf",
      "#8b56bf",
      "#bf568b",
      "#bf5656"
    ],
    "harmonic-light": [
      "#f7f9fb",
      "#e5ebf1",
      "#cbd6e2",
      "#aabcce",
      "#627e99",
      "#405c79",
      "#223b54",
      "#0b1c2c",
      "#bf8b56",
      "#bfbf56",
      "#8bbf56",
      "#56bf8b",
      "#568bbf",
      "#8b56bf",
      "#bf568b",
      "#bf5656"
    ],
    "heetch-light": [
      "#feffff",
      "#392551",
      "#7b6d8b",
      "#9c92a8",
      "#ddd6e5",
      "#5a496e",
      "#470546",
      "#190134",
      "#27d9d5",
      "#bdb6c5",
      "#5ba2b6",
      "#f80059",
      "#c33678",
      "#47f9f5",
      "#bd0152",
      "#dedae2"
    ],
    heetch: [
      "#190134",
      "#392551",
      "#5a496e",
      "#7b6d8b",
      "#9c92a8",
      "#bdb6c5",
      "#dedae2",
      "#feffff",
      "#27d9d5",
      "#5ba2b6",
      "#8f6c97",
      "#c33678",
      "#f80059",
      "#bd0152",
      "#82034c",
      "#470546"
    ],
    helios: [
      "#1d2021",
      "#383c3e",
      "#53585b",
      "#6f7579",
      "#cdcdcd",
      "#d5d5d5",
      "#dddddd",
      "#e5e5e5",
      "#d72638",
      "#eb8413",
      "#f19d1a",
      "#88b92d",
      "#1ba595",
      "#1e8bac",
      "#be4264",
      "#c85e0d"
    ],
    hopscotch: [
      "#322931",
      "#433b42",
      "#5c545b",
      "#797379",
      "#989498",
      "#b9b5b8",
      "#d5d3d5",
      "#ffffff",
      "#dd464c",
      "#fd8b19",
      "#fdcc59",
      "#8fc13e",
      "#149b93",
      "#1290bf",
      "#c85e7c",
      "#b33508"
    ],
    "horizon-dark": [
      "#1c1e26",
      "#232530",
      "#2e303e",
      "#676a8d",
      "#ced1d0",
      "#cbced0",
      "#dcdfe4",
      "#e3e6ee",
      "#e93c58",
      "#e58d7d",
      "#efb993",
      "#efaf8e",
      "#24a8b4",
      "#df5273",
      "#b072d1",
      "#e4a382"
    ],
    "ia-dark": [
      "#1a1a1a",
      "#222222",
      "#1d414d",
      "#767676",
      "#b8b8b8",
      "#cccccc",
      "#e8e8e8",
      "#f8f8f8",
      "#d88568",
      "#d86868",
      "#b99353",
      "#83a471",
      "#7c9cae",
      "#8eccdd",
      "#b98eb2",
      "#8b6c37"
    ],
    "ia-light": [
      "#f6f6f6",
      "#dedede",
      "#bde5f2",
      "#898989",
      "#767676",
      "#181818",
      "#e8e8e8",
      "#f8f8f8",
      "#9c5a02",
      "#c43e18",
      "#c48218",
      "#38781c",
      "#2d6bb1",
      "#48bac2",
      "#a94598",
      "#8b6c37"
    ],
    icy: [
      "#021012",
      "#031619",
      "#041f23",
      "#052e34",
      "#064048",
      "#095b67",
      "#0c7c8c",
      "#109cb0",
      "#16c1d9",
      "#b3ebf2",
      "#80deea",
      "#4dd0e1",
      "#26c6da",
      "#00bcd4",
      "#00acc1",
      "#0097a7"
    ],
    isotope: [
      "#000000",
      "#404040",
      "#606060",
      "#808080",
      "#c0c0c0",
      "#d0d0d0",
      "#e0e0e0",
      "#ffffff",
      "#ff0000",
      "#ff9900",
      "#ff0099",
      "#33ff00",
      "#00ffff",
      "#0066ff",
      "#cc00ff",
      "#3300ff"
    ],
    macintosh: [
      "#000000",
      "#404040",
      "#404040",
      "#808080",
      "#808080",
      "#c0c0c0",
      "#c0c0c0",
      "#ffffff",
      "#dd0907",
      "#ff6403",
      "#fbf305",
      "#1fb714",
      "#02abea",
      "#0000d3",
      "#4700a5",
      "#90713a"
    ],
    marrakesh: [
      "#201602",
      "#302e00",
      "#5f5b17",
      "#6c6823",
      "#86813b",
      "#948e48",
      "#ccc37a",
      "#faf0a5",
      "#c35359",
      "#b36144",
      "#a88339",
      "#18974e",
      "#75a738",
      "#477ca1",
      "#8868b3",
      "#b3588e"
    ],
    materia: [
      "#263238",
      "#2c393f",
      "#37474f",
      "#707880",
      "#c9ccd3",
      "#cdd3de",
      "#d5dbe5",
      "#ffffff",
      "#ec5f67",
      "#ea9560",
      "#ffcc00",
      "#8bd649",
      "#80cbc4",
      "#89ddff",
      "#82aaff",
      "#ec5f67"
    ],
    "material-lighter": [
      "#fafafa",
      "#e7eaec",
      "#cceae7",
      "#ccd7da",
      "#8796b0",
      "#80cbc4",
      "#80cbc4",
      "#666666",
      "#ff5370",
      "#f76d47",
      "#ffb62c",
      "#91b859",
      "#39adb5",
      "#6182b8",
      "#7c4dff",
      "#e53935"
    ],
    material: [
      "#263238",
      "#2e3c43",
      "#314549",
      "#546e7a",
      "#b2ccd6",
      "#eeffff",
      "#eeffff",
      "#ffffff",
      "#f07178",
      "#f78c6c",
      "#ffcb6b",
      "#c3e88d",
      "#89ddff",
      "#82aaff",
      "#c792ea",
      "#ff5370"
    ],
    "mellow-purple": [
      "#1e0528",
      "#1a092d",
      "#331354",
      "#320f55",
      "#873582",
      "#ffeeff",
      "#ffeeff",
      "#f8c0ff",
      "#00d9e9",
      "#aa00a3",
      "#955ae7",
      "#05cb0d",
      "#b900b1",
      "#550068",
      "#8991bb",
      "#4d6fff"
    ],
    "mexico-light": [
      "#f8f8f8",
      "#e8e8e8",
      "#d8d8d8",
      "#b8b8b8",
      "#585858",
      "#383838",
      "#282828",
      "#181818",
      "#ab4642",
      "#dc9656",
      "#f79a0e",
      "#538947",
      "#4b8093",
      "#7cafc2",
      "#96609e",
      "#a16946"
    ],
    mocha: [
      "#3b3228",
      "#534636",
      "#645240",
      "#7e705a",
      "#b8afad",
      "#d0c8c6",
      "#e9e1dd",
      "#f5eeeb",
      "#cb6077",
      "#d28b71",
      "#f4bc87",
      "#beb55b",
      "#7bbda4",
      "#8ab3b5",
      "#a89bb9",
      "#bb9584"
    ],
    monokai: [
      "#272822",
      "#383830",
      "#49483e",
      "#75715e",
      "#a59f85",
      "#f8f8f2",
      "#f5f4f1",
      "#f9f8f5",
      "#f92672",
      "#fd971f",
      "#f4bf75",
      "#a6e22e",
      "#a1efe4",
      "#66d9ef",
      "#ae81ff",
      "#cc6633"
    ],
    nord: [
      "#2e3440",
      "#3b4252",
      "#434c5e",
      "#4c566a",
      "#d8dee9",
      "#e5e9f0",
      "#eceff4",
      "#8fbcbb",
      "#88c0d0",
      "#81a1c1",
      "#5e81ac",
      "#bf616a",
      "#d08770",
      "#ebcb8b",
      "#a3be8c",
      "#b48ead"
    ],
    ocean: [
      "#2b303b",
      "#343d46",
      "#4f5b66",
      "#65737e",
      "#a7adba",
      "#c0c5ce",
      "#dfe1e8",
      "#eff1f5",
      "#bf616a",
      "#d08770",
      "#ebcb8b",
      "#a3be8c",
      "#96b5b4",
      "#8fa1b3",
      "#b48ead",
      "#ab7967"
    ],
    "one-light": [
      "#fafafa",
      "#f0f0f1",
      "#e5e5e6",
      "#a0a1a7",
      "#696c77",
      "#383a42",
      "#202227",
      "#090a0b",
      "#ca1243",
      "#d75f00",
      "#c18401",
      "#50a14f",
      "#0184bc",
      "#4078f2",
      "#a626a4",
      "#986801"
    ],
    onedark: [
      "#282c34",
      "#353b45",
      "#3e4451",
      "#545862",
      "#565c64",
      "#abb2bf",
      "#b6bdca",
      "#c8ccd4",
      "#e06c75",
      "#d19a66",
      "#e5c07b",
      "#98c379",
      "#56b6c2",
      "#61afef",
      "#c678dd",
      "#be5046"
    ],
    "papercolor-dark": [
      "#1c1c1c",
      "#af005f",
      "#5faf00",
      "#d7af5f",
      "#5fafd7",
      "#808080",
      "#d7875f",
      "#d0d0d0",
      "#585858",
      "#5faf5f",
      "#afd700",
      "#af87d7",
      "#ffaf00",
      "#ff5faf",
      "#00afaf",
      "#5f8787"
    ],
    "papercolor-light": [
      "#eeeeee",
      "#af0000",
      "#008700",
      "#5f8700",
      "#0087af",
      "#878787",
      "#005f87",
      "#444444",
      "#bcbcbc",
      "#d70000",
      "#d70087",
      "#8700af",
      "#d75f00",
      "#d75f00",
      "#005faf",
      "#005f87"
    ],
    paraiso: [
      "#2f1e2e",
      "#41323f",
      "#4f424c",
      "#776e71",
      "#8d8687",
      "#a39e9b",
      "#b9b6b0",
      "#e7e9db",
      "#ef6155",
      "#f99b15",
      "#fec418",
      "#48b685",
      "#5bc4bf",
      "#06b6ef",
      "#815ba4",
      "#e96ba8"
    ],
    pico: [
      "#000000",
      "#1d2b53",
      "#7e2553",
      "#008751",
      "#ab5236",
      "#5f574f",
      "#c2c3c7",
      "#fff1e8",
      "#ff004d",
      "#ffa300",
      "#fff024",
      "#00e756",
      "#29adff",
      "#83769c",
      "#ff77a8",
      "#ffccaa"
    ],
    pop: [
      "#000000",
      "#202020",
      "#303030",
      "#505050",
      "#b0b0b0",
      "#d0d0d0",
      "#e0e0e0",
      "#ffffff",
      "#eb008a",
      "#f29333",
      "#f8ca12",
      "#37b349",
      "#00aabb",
      "#0e5a94",
      "#b31e8d",
      "#7a2d00"
    ],
    railscasts: [
      "#2b2b2b",
      "#272935",
      "#3a4055",
      "#5a647e",
      "#d4cfc9",
      "#e6e1dc",
      "#f4f1ed",
      "#f9f7f3",
      "#da4939",
      "#cc7833",
      "#ffc66d",
      "#a5c261",
      "#519f50",
      "#6d9cbe",
      "#b6b3eb",
      "#bc9458"
    ],
    seti: [
      "#151718",
      "#282a2b",
      "#3b758c",
      "#41535b",
      "#43a5d5",
      "#d6d6d6",
      "#eeeeee",
      "#ffffff",
      "#cd3f45",
      "#db7b55",
      "#e6cd69",
      "#9fca56",
      "#55dbbe",
      "#55b5db",
      "#a074c4",
      "#8a553f"
    ],
    "solarized-dark": [
      "#002b36",
      "#073642",
      "#586e75",
      "#657b83",
      "#839496",
      "#93a1a1",
      "#eee8d5",
      "#fdf6e3",
      "#dc322f",
      "#cb4b16",
      "#b58900",
      "#859900",
      "#2aa198",
      "#268bd2",
      "#6c71c4",
      "#d33682"
    ],
    "solarized-light": [
      "#fdf6e3",
      "#eee8d5",
      "#93a1a1",
      "#839496",
      "#657b83",
      "#586e75",
      "#073642",
      "#002b36",
      "#dc322f",
      "#cb4b16",
      "#b58900",
      "#859900",
      "#2aa198",
      "#268bd2",
      "#6c71c4",
      "#d33682"
    ],
    spacemacs: [
      "#1f2022",
      "#282828",
      "#444155",
      "#585858",
      "#b8b8b8",
      "#a3a3a3",
      "#e8e8e8",
      "#f8f8f8",
      "#f2241f",
      "#ffa500",
      "#b1951d",
      "#67b11d",
      "#2d9574",
      "#4f97d7",
      "#a31db1",
      "#b03060"
    ],
    "summerfruit-dark": [
      "#151515",
      "#202020",
      "#303030",
      "#505050",
      "#b0b0b0",
      "#d0d0d0",
      "#e0e0e0",
      "#ffffff",
      "#ff0086",
      "#fd8900",
      "#aba800",
      "#00c918",
      "#1faaaa",
      "#3777e6",
      "#ad00a1",
      "#cc6633"
    ],
    "summerfruit-light": [
      "#ffffff",
      "#e0e0e0",
      "#d0d0d0",
      "#b0b0b0",
      "#000000",
      "#101010",
      "#151515",
      "#202020",
      "#ff0086",
      "#fd8900",
      "#aba800",
      "#00c918",
      "#1faaaa",
      "#3777e6",
      "#ad00a1",
      "#cc6633"
    ],
    "tomorrow-night": [
      "#1d1f21",
      "#282a2e",
      "#373b41",
      "#969896",
      "#b4b7b4",
      "#c5c8c6",
      "#e0e0e0",
      "#ffffff",
      "#cc6666",
      "#de935f",
      "#f0c674",
      "#b5bd68",
      "#8abeb7",
      "#81a2be",
      "#b294bb",
      "#a3685a"
    ],
    tomorrow: [
      "#ffffff",
      "#e0e0e0",
      "#d6d6d6",
      "#8e908c",
      "#969896",
      "#4d4d4c",
      "#282a2e",
      "#1d1f21",
      "#c82829",
      "#f5871f",
      "#eab700",
      "#718c00",
      "#3e999f",
      "#4271ae",
      "#8959a8",
      "#a3685a"
    ],
    tube: [
      "#231f20",
      "#1c3f95",
      "#5a5758",
      "#737171",
      "#959ca1",
      "#d9d8d8",
      "#e7e7e8",
      "#ffffff",
      "#ee2e24",
      "#f386a1",
      "#ffd204",
      "#00853e",
      "#85cebc",
      "#009ddc",
      "#98005d",
      "#b06110"
    ],
    twilight: [
      "#1e1e1e",
      "#323537",
      "#464b50",
      "#5f5a60",
      "#838184",
      "#a7a7a7",
      "#c3c3c3",
      "#ffffff",
      "#cf6a4c",
      "#cda869",
      "#f9ee98",
      "#8f9d6a",
      "#afc4db",
      "#7587a6",
      "#9b859d",
      "#9b703f"
    ],
    woodland: [
      "#231e18",
      "#302b25",
      "#48413a",
      "#9d8b70",
      "#b4a490",
      "#cabcb1",
      "#d7c8bc",
      "#e4d4c8",
      "#d35c5c",
      "#ca7f32",
      "#e0ac16",
      "#b7ba53",
      "#6eb958",
      "#88a4d3",
      "#bb90e2",
      "#b49368"
    ],
    zenburn: [
      "#383838",
      "#404040",
      "#606060",
      "#6f6f6f",
      "#808080",
      "#dcdccc",
      "#c0c0c0",
      "#ffffff",
      "#dca3a3",
      "#dfaf8f",
      "#e0cf9f",
      "#5f7f5f",
      "#93e0e3",
      "#7cb8bb",
      "#dc8cc3",
      "#000000"
    ]
  };
  var availableThemes = Object.keys(themes);
  var themeStyles = (nameOrObject) => {
    let theme;
    if (typeof nameOrObject === "string") {
      if (themes[nameOrObject] === void 0) {
        throw new Error(`${nameOrObject} not found`);
      }
      theme = themes[nameOrObject].reduce((map, v, i) => {
        const key = `base0${i.toString(16).toUpperCase()}`;
        map[key] = v;
        return map;
      }, {});
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
    level = 0,
    parentRow
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
      const length = thisDataType === "array" ? value.length : Object.keys(value).length;
      itemsSize.className = "items-size";
      itemsSize.textContent = `${length} item${length === 1 ? "" : "s"}`;
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
          level: level + 1,
          parentRow: row
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
        valueType.textContent = thisDataType.toLowerCase();
      }
      const valueWrapper = document.createElement("span");
      valueWrapper.className = `value ${thisDataType.toLowerCase()}`;
      valueEl = document.createElement("span");
      valueEl.textContent = thisDataType === "string" ? `"${value}"` : value;
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
      const regex = new RegExp(searchTerm2, "gi");
      const searchElements = [];
      if (keyEl)
        searchElements.push(keyEl);
      if (valueEl)
        searchElements.push(valueEl);
      let found = false;
      searchElements.forEach((el) => {
        const string = el.textContent;
        el.innerHTML = string;
        if (!searchTerm2 || searchTerm2 === "")
          return;
        const indexes = [...string.matchAll(regex)].map((m) => m.index);
        const newHtml = [];
        let lastIndex = 0;
        indexes.forEach((index) => {
          found = true;
          newHtml.push(string.slice(lastIndex, index));
          newHtml.push(`<span class="match">${searchTerm2}</span>`);
          lastIndex = index + searchTerm2.length;
        });
        newHtml.push(string.slice(lastIndex));
        el.innerHTML = newHtml.join("");
      });
      if (found && !row.classList.contains("expanded")) {
        console.log("============================", "expand");
        toggleExpand();
        if (parentRow)
          parentRow.classList.add("expanded");
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
        showDetails: this.showDetails
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
    this.update = ({
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
              onChange: ({ expanded: expanded2, indent: indent2, showDetails }) => {
                const options2 = { expanded: expanded2, indent: indent2 };
                if (showDetails !== void 0) {
                  options2.showCopy = showDetails;
                  options2.showSize = showDetails;
                  options2.showDataTypes = showDetails;
                }
                this.update(options2);
              },
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
    this.update(options);
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
