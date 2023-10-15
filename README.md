# JSON Viewer

## Introduction

JSON Viewer is a versatile tool that allows you to visualize JSON data in an organized and user-friendly manner. This README provides information on how to customize the theme of the JSON Viewer to suit your preferences.

## Themes

You can easily change the theme of the JSON Viewer by using the `theme` attribute within the `json-viewer` tag. Here's an example:

```html
<json-viewer theme="monokai">...</json-viewer>
```

### Predefined Themes

We offer a variety of predefined themes to choose from. Each theme has a unique visual style that can enhance your JSON viewing experience. Here's a list of available themes:

1. apathy
2. ashes
3. atelier-dune-light
4. atelier-dune
5. atlas
6. bespin
7. black-metal
8. brewer
9. bright
10. brogrammer
11. brushtrees-dark
12. brushtrees
13. chalk
14. circus
15. classic-dark
16. classic-light
17. codeschool
18. cupcake
19. cupertino
20. darcula
21. darktooth
22. default-dark
23. default-light
24. dracula
25. eighties
26. embers
27. flat
28. fruit-soda
29. github
30. google-dark
31. google-light
32. grayscale-dark
33. grayscale-light
34. greenscreen
35. gruvbox-dark-hard
36. gruvbox-light-hard
37. harmonic-dark
38. harmonic-light
39. heetch-light
40. heetch
41. helios
42. hopscotch
43. horizon-dark
44. ia-dark
45. ia-light
46. icy
47. isotope
48. macintosh
49. marrakesh
50. materia
51. material-lighter
52. material
53. mellow-purple
54. mexico-light
55. mocha
56. monokai
57. nord
58. ocean
59. one-light
60. onedark
61. papercolor-dark
62. papercolor-light
63. paraiso
64. pico
65. pop
66. railscasts
67. seti
68. solarized-dark
69. solarized-light
70. spacemacs
71. summerfruit-dark
72. summerfruit-light
73. tomorrow-night
74. tomorrow
75. tube
76. twilight
77. woodland
78. zenburn

### Customizing Themes

If you want to fine-tune your theme further, the JSON Viewer allows you to customize the individual color components of the theme. The theme is based on 16 base colors, each representing different aspects of the JSON Viewer's interface.

Here are the 16 color variables you can customize:

1. `--base00`: Default Background
2. `--base01`: Lighter Background
3. `--base02`: Selection Background
4. `--base03`: Comments, Invisibles, Line Highlighting
5. `--base04`: Dark Foreground
6. `--base05`: Default Foreground
7. `--base06`: Light Foreground
8. `--base07`: Light Background
9. `--base08`: Variables, XML Tags, Markup Link Text, Markup Lists, Diff Deleted
10. `--base09`: Integers, Boolean, Constants, XML Attributes, Markup Link URL
11. `--base0A`: Classes, Markup Bold, Search Text Background
12. `--base0B`: Strings, Inherited Class, Markup Code, Diff Inserted
13. `--base0C`: Support, Regular Expressions, Escape Characters, Markup Quotes
14. `--base0D`: Functions, Methods, Attribute IDs, Headings
15. `--base0E`: Keywords, Storage, Selector, Markup Italic, Diff Changed
16. `--base0F`: Deprecated, Opening/Closing Embedded Language Tags

### Customization Instructions

You can customize the theme by creating a JSON configuration that specifies your preferred color values for these 16 base colors. Here's an example of how the JSON configuration should be structured:

```html
<json-viewer
  theme='{
  "base00": "red",
  "base01": "lightblue",
  "base02": "darkgray",
  "base03": "green",
  "base04": "black",
  "base05": "white",
  "base06": "lightgray",
  "base07": "lightyellow",
  "base08": "purple",
  "base09": "orange",
  "base0A": "pink",
  "base0B": "brown",
  "base0C": "cyan",
  "base0D": "blue",
  "base0E": "magenta",
  "base0F": "gray"
}'
></json-viewer>
```

In this example, each base color is assigned a custom color value. You can replace these color values with the ones you prefer. Customizing the theme using JSON configuration gives you full control over the appearance of your JSON Viewer, allowing you to tailor it to your specific needs.
