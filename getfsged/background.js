// chrome.contextMenus.removeAll();
// chrome.contextMenus.create({
//   id: "NEW",
//   title: "New GEDCOM",
//   contexts: ["browser_action"],
// });
// chrome.contextMenus.onClicked.addListener((info, tab) => {
// 	console.log('tab',tab)
//   if (info.menuItemId === "NEW") {
//     // Execute foo using tab id
//     foo(tab.id);
//   }
// });

// const foo = (tabId) => { console.log(`Foo called on tab with id ${tabId}`) };

// chrome.action.addListener((test) => {
// 	console.log('here',test)
// })

// chrome.tabs.onActivated.addListener(function(tab) {
// //console.log('here', tab, self.clients)
// 	chrome.tabs.query({active: true, currentWindow:true},(info)=>{
// 		//console.log('..',info,info[0].url);
// 		if(info[0].url.includes('familysearch.org')){
// 			//console.log('enable')
// 			chrome.action.enable();
// 		}else{
// 			//console.log('disable')
// 			chrome.action.disable();
// 		}
// 	});
// });

chrome.action.onClicked.addListener(
  (tab)=>{
		console.log('>>', tab)
		chrome.windows.create({
			tabId: tab.id,
			type: 'panel',
			focused: true
		})
		// chrome.scripting.executeScript({
		// 	target: {tabId: tab.id},
		// 	files: ['copy.js']
		// },()=>{
		// 	console.log('ggggg')
		// 	chrome.notifications.create('copied', {
		// 		type: 'basic',
		// 		iconUrl: 'copy.png',
		// 		title: 'Copied Data',
		// 		message: 'Fanchart information has been copied.',
		// 		priority: 2
		// 	})
		// 	chrome.notifications.clear('copied')
		// });
  }
)

// function contextMenuClick(info,tab){
// 	//console.log('context menu clicked',info,tab)
// 	chrome.storage.sync.set({
// 		'field': info.menuItemId
// 	})
// 	chrome.scripting.executeScript({
// 		target: {tabId: tab.id},
// 		files: ['paste.js']
// 	});
// }

// chrome.contextMenus.create({
// 	title: 'Name',
// 	id: 'name',
// 	contexts: ['editable']
// })
// chrome.contextMenus.create({
// 	title: 'Auto Fill Name',
// 	id: 'autoName',
// 	parentId: 'name',
// 	contexts: ['editable']
// })
// chrome.contextMenus.create({
// 	title: 'Full Name',
// 	id: 'fullName',
// 	parentId: 'name',
// 	contexts: ['editable']
// })
// chrome.contextMenus.create({
// 	title: 'First Names',
// 	id: 'firstName',
// 	parentId: 'name',
// 	contexts: ['editable']
// })
// chrome.contextMenus.create({
// 	title: 'Last Name',
// 	id: 'lastName',
// 	parentId: 'name',
// 	contexts: ['editable']
// })
// chrome.contextMenus.create({
// 	title: 'Birth',
// 	id: 'birth',
// 	contexts: ['editable']
// })
// chrome.contextMenus.create({
// 	title: 'Auto Fill Birth',
// 	id: 'autoBirth',
// 	parentId: 'birth',
// 	contexts: ['editable']
// })
// chrome.contextMenus.create({
// 	title: 'Date of Birth',
// 	id: 'dob',
// 	parentId: 'birth',
// 	contexts: ['editable']
// })
// chrome.contextMenus.create({
// 	title: 'Birthplace',
// 	id: 'pob',
// 	parentId: 'birth',
// 	contexts: ['editable']
// })
// chrome.contextMenus.create({
// 	title: 'Death',
// 	id: 'death',
// 	contexts: ['editable']
// })
// chrome.contextMenus.create({
// 	title: 'Auto Fill Death',
// 	id: 'autoDeath',
// 	parentId: 'death',
// 	contexts: ['editable']
// })
// chrome.contextMenus.create({
// 	title: 'Date of Death',
// 	id: 'dod',
// 	parentId: 'death',
// 	contexts: ['editable']
// })
// chrome.contextMenus.create({
// 	title: 'Place of Death',
// 	id: 'pod',
// 	parentId: 'death',
// 	contexts: ['editable']
// })
// chrome.contextMenus.create({
// 	title: 'Burial',
// 	id: 'burial',
// 	contexts: ['editable']
// })
// chrome.contextMenus.onClicked.addListener(contextMenuClick)