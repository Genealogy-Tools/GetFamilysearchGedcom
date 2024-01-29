{
	let active = document.activeElement;
	//let activeRoot = active && active.shadowRoot;
	console.log('active',active)//,activeRoot.querySelectorAll('birch-standards-picker'))
	
	chrome.storage.sync.get(['field','autoName','fullName','memorial','autoBirth','firstName','lastName','suffix','dob','dod','pob','pod','bio','burial'], function (items){
		console.log('storage',items,items.field);
		switch(items.field){
			case 'autoName':
				document.querySelectorAll('[part="firstName"]')[0].value = items['firstName'];
				document.querySelectorAll('[part="lastName"]')[0].value = items['lastName'];
				break;
			case 'autoDeath':
				document.querySelectorAll('[data-testid="conclusionDetailOverlay:date"]')[0].value = items.dod;
				document.querySelectorAll('[data-testid="conclusionDetailOverlay:place"]')[0].value = items.pod;
				break;
			case 'autoBirth':
				document.querySelectorAll('[data-testid="conclusionDetailOverlay:date"]')[0].value = items.dob;
				document.querySelectorAll('[data-testid="conclusionDetailOverlay:place"]')[0].value = items.pob;
			case 'fullName':
			case 'firstName':
			case 'lastName':
			case 'suffix':
				//document.querySelectorAll(`[part="${items.field}"]`)[0].value=items[items.field]
			case 'dob':
			case 'pob':
				//active.value=items.pob
			case 'dod':
			case 'burial':
			case 'pod':
				active.value = items[items.field];
				break;
		}
		
		console.log('>>>',document.querySelectorAll('[name="justification"]'))
		const currentJustification = document.querySelectorAll('[name="justification"]')[0].value
		if(!currentJustification.includes('Find a grave #')) {
			document.querySelectorAll('[name="justification"]')[0].value = `${currentJustification}\nFind a grave #${items.memorial}`;
		}
	})

//console.log('should paste',document.activeElement);
}