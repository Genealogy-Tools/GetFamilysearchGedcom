chrome.action.onClicked.addListener(
  (tab)=>{
		console.log('>>', tab)
		chrome.windows.create({
			tabId: tab.id,
			type: 'panel',
			focused: true
		})
  }
)
