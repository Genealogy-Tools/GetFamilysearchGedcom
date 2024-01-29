let gedFiles = []
const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

async function getStorage() {
  await chrome.storage.local.get({gedFiles: []}, function (result) {
    // the input argument is ALWAYS an object containing the queried keys
    // so we select the key we need
    gedFiles = result.gedFiles;
    console.log('storage',gedFiles)
    const template = document.getElementById("li_template");
    const elements = new Set();
    for (const [index,file] of gedFiles.entries()) {
      const element = template.content.firstElementChild.cloneNode(true);

      const person = `${file[0].firstName} ${file[0].lastName}`;
      const gen = Math.log2(file.length+1);

      element.querySelector(".person").textContent = person;
      element.querySelector(".generations").textContent = `Gens: ${gen}`;
      if(!tab.url.includes('familysearch.org')){
        element.querySelector(".update").setAttribute('disabled', true)
      }else{
        element.querySelector('.update').addEventListener('click', async function (){
          if(tab.url.includes('familysearch.org/tree/person/details')) {
            // update a person
            // verify id in gedFiles
            const urlId = tab.url.slice(tab.url.length-8)
            const primaryIdx = gedFiles.find(p=>p.id === urlId)
            if (primaryIdx === -1) {
              return // nothing to update
            }
            //get data
            let response = await chrome.scripting.executeScript({
              target: {tabId: tab.id},
              func: () => document.querySelector('div[data-testid="conclusionDisplay:BIRTH"] span[data-testid="conclusion-date"]').innerHTML
            })
            let birth = response[0].result
            response = await chrome.scripting.executeScript({
              target: {tabId: tab.id},
              func: () => document.querySelector('div[data-testid="conclusionDisplay:DEATH"] span[data-testid="conclusion-date"]').innerHTML
            })
            let death = response[0].result
            //update gedFiles
            gedFiles[primaryIdx].birthYear = birth
            gedFiles[primaryIdx].deathYear = death
            chrome.storage.local.set({gedFiles: gedFiles}, function () {})
          } else {
            //update with more people
          }
        })
      }
      element.querySelector('.remove').addEventListener('click', function (){
        // remove from gedFiles
        gedFiles.splice(index,1)
        // remove from html
        let ul = document.querySelector("ul")
        let me = ul.childNodes[index]
        me.parentNode.removeChild(me)
      })
      element.querySelector('.download').addEventListener('click', function (){
        const gen = Math.log2(file.length+1);
        let filename = `${file[0].id}_g${Math.floor(gen)}.ged`
        let now = new Date()
        // create header
        let gedContents = `0 HEAD\n1 GEDC\n2 VERS 7.0.0\n1 SOUR familysearch.org/\n2 CORP depperm\n3 WWW github.com/depperm/<todo>\n1 DATE ${now.getDate()} ${now.toLocaleString('en-US', {month: 'short'})} ${now.getFullYear()}\n`
        // add contents
        let indis=''
        let fams=''
        for (const [idx,person] of file.entries()) {
          indis += `0 @I${idx+1}@ INDI\n1 NAME ${person.firstName} /${person.lastName}/\n2 SURN ${person.lastName}\n`
          if(idx > 0) {
            indis += `1 SEX ${idx%2==0?'F':'M'}\n`
          }
          indis += `1 EXID ${person.id}\n2 TYPE https://familysearch.org\n`
          indis += `${person.birthYear ? `1 BIRT\n2 DATE ${person.birthYear}\n`:''}`
          indis += `${person.deathYear ? `${person.deathYear !=='Living'?`1 DEAT\n2 DATE ${person.deathYear}\n`:''}` : ''}`

          if (idx < Math.pow(2, gen-1)-1) {
            indis += `1 FAMC @F${idx+1}@\n`
            fams += `0 @F${idx+1}@ FAM\n1 HUSB @I${((idx)*2)+2}@\n1 WIFE @I${((idx)*2)+3}@\n1 CHIL @I${idx+1}@\n`
          }
        }
        gedContents += indis
        gedContents += fams
        // append footer
        gedContents += '0 TRLR'
        chrome.downloads.download({
          url: 'data:attachment/text,'+encodeURI(gedContents),
          filename: filename
        })
      })
      elements.add(element);
    }
    document.querySelector("ul").append(...elements);
  });
}

function clear(){
  gedFiles = []
  chrome.storage.local.set({gedFiles: gedFiles}, function () {
    document.querySelector("ul").innerHTML = ''
  })
}
function addGedInfo(gedArray){
  document.querySelector("ul").innerHTML = ''
  gedFiles.push(gedArray)
  chrome.storage.local.set({gedFiles: gedFiles}, function () {})
  getStorage()
}

async function getNew(){
  const [{result}] = await chrome.scripting.executeScript({
    target: {tabId: tab.id},
    func: () => document.querySelector('options-dialog').shadowRoot.querySelector('#generationControl').shadowRoot.querySelector('.selected').getAttribute('data-value'),
  });
  let size = Math.pow(2, parseInt(result)) - 1
  let info = new Array(size)
  for (let i = 0; i < size; i++){
    // this for some reason can only return strings
    let response = await chrome.scripting.executeScript({
      args: [i],
      target: {tabId: tab.id},
      func: (i) => document.querySelector('tree-app').shadowRoot.querySelector('#pages').querySelector('tree-fanchart').shadowRoot.querySelector('#fanchart').shadowRoot.querySelector(`#textPathFirst_${i+1}`).innerHTML
    })
    let first = response[0].result

    response = await chrome.scripting.executeScript({
      args: [i],
      target: {tabId: tab.id},
      func: (i) => document.querySelector('tree-app').shadowRoot.querySelector('#pages').querySelector('tree-fanchart').shadowRoot.querySelector('#fanchart').shadowRoot.querySelector(`#textPathFirst_${i+1}`).getAttribute('data-pid')
    })
    let fsid = response[0].result

    response = await chrome.scripting.executeScript({
      args: [i],
      target: {tabId: tab.id},
      func: (i) => document.querySelector('tree-app').shadowRoot.querySelector('#pages').querySelector('tree-fanchart').shadowRoot.querySelector('#fanchart').shadowRoot.querySelector(`#textPathLast_${i+1}`).innerHTML
    })
    let last = response[0].result

    response = await chrome.scripting.executeScript({
      args: [i],
      target: {tabId: tab.id},
      func: (i) => document.querySelector('tree-app').shadowRoot.querySelector('#pages').querySelector('tree-fanchart').shadowRoot.querySelector('#fanchart').shadowRoot.querySelector('#textPathLifespan_'+(i+1).toString()) ? document.querySelector('tree-app').shadowRoot.querySelector('#pages').querySelector('tree-fanchart').shadowRoot.querySelector('#fanchart').shadowRoot.querySelector(`#textPathLifespan_${i+1}`).innerHTML : ''
    })
    let dates = response[0].result

    let dStr = dates ? dates : '–'
    let person = {
      firstName: first ? first : '',
      lastName: last ? last : '',
      id: fsid,
      birthYear: dStr.split('–')[0],
      deathYear: dStr.split('–')[1]
    }
    info[i] = person
  }
  addGedInfo(info)
}

document.getElementById('clear').addEventListener('click', clear)

getStorage()
if (tab.url.includes('familysearch.org/tree/pedigree/fanchart')){
  document.getElementById('getNew').addEventListener('click', getNew)
} else if (tab.url.includes('familysearch.org/tree/person/details')){
  document.getElementById('getNew').setAttribute('disabled', true)
} else {
  document.getElementById('getNew').setAttribute('disabled', true)

}