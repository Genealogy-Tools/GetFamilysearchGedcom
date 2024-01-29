# Get Familysearch GEDCOM
Gets info from familysearch fanchart to create gedcom data*

## Install
1. Download v#.#.# from Release (right hand side)
2. Unzip
3. Go to:
    - chrome://extensions/ (for chrome)
    - vivaldi://extensions/ (for vivaldi)
4. Enable Developer mode (should be top right)
5. Click 'Load unpacked' and select the folder that was unzipped from step 2

## Usage
1. Visit familysearch fanchart (https://www.familysearch.org/tree/pedigree/fanchart/####-###)
2. Click on the extension icon (should be a G, top right)
3. Click New GEDCOM for Individual
    - There should be a new list item listing the root person and the number of generations

### Update Data (birth/death dates)
1. Visit familysearch detail (https://www.familysearch.org/tree/person/details/####-###)
2. Click on the extension icon
3. Click Update on the root person whose familytree contains the person you are visiting (nothing should update if you are viewing a person not in the tree)

### Expand/Grow Data
1. TODO

### Get GEDCOM file
1. Click on the extension icon
2. Click Download on the root person whose data you'd like

## Potential Issues
- Findagrave/Familysearch might change UI/html which might break the extension

## TODO
- Expand/Grow Data/Tree
- Get Marriage Date
- Get Children

\* Initial data is very minimal. Coming from the fanchart this includes only parents and only birth/death years for most people (the outer people do not initially have dates). This extension should allow updating this info, but it'll be a fairly tedious process. The primary goal of this extension is to get data to create own fanchart (coming soon?)