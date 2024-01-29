/*localStorage.setItem('name',document.getElementById('bio-name').textContent);
localStorage.setItem('dob',document.getElementById('birthDateLabel').textContent);
localStorage.setItem('pob',document.getElementById('birthLocationLabel').textContent);
localStorage.setItem('dod',document.getElementById('deathDateLabel').textContent);
localStorage.setItem('pod',document.getElementById('deathLocationLabel').textContent);
localStorage.setItem('burial',document.getElementById('otherPlace').textContent);
localStorage.setItem('bio',document.getElementById('fullBio').textContent);*/
{
	let fullName = document.getElementById('bio-name').textContent.trim();
	//console.log('storing',fullName,'####',fullName.slice(0,fullName.lastIndexOf(' ')),'###', fullName.slice(fullName.lastIndexOf(' ')+1))
	const suffix = fullName.match(/(Jr.|Sr.|I|II|III|IV|V|VI)$/g);
	//console.log(fullName.match(/(Jr.|Sr.|I|II|III|IV|V|VI)$/g));
	const nameParts=fullName.split(' ');
	const dod = document.getElementById('deathDateLabel').textContent;
	
	chrome.storage.sync.set({
		'fullName': fullName,
		'firstName': !suffix ? fullName.slice(0,fullName.lastIndexOf(' ')) : fullName.slice(0,fullName.indexOf(nameParts[nameParts.length-2])),
		'lastName': !suffix ? nameParts[nameParts.length-1] : nameParts[nameParts.length-2],
		'suffix': !suffix ? '' : suffix[0],
		'dob': document.getElementById('birthDateLabel').textContent,
		'pob': document.getElementById('birthLocationLabel') ? document.getElementById('birthLocationLabel').textContent : '',
		'dod': dod.slice(0,dod.indexOf(' (')),
		'pod': document.getElementById('deathLocationLabel') ? document.getElementById('deathLocationLabel').textContent: '',
		'burial': document.getElementById('cemeteryNameLabel') ? `${document.getElementById('cemeteryNameLabel').textContent}, ${document.getElementById('cemeteryCityName').textContent}, ${document.getElementById('cemeteryCountyName').textContent}, ${document.getElementById('cemeteryStateName').textContent}, ${document.getElementById('cemeteryCountryName').textContent}` : '',
		'bio': document.getElementById('fullBio') ? document.getElementById('fullBio').textContent : '',
		'memorial': document.getElementById('memNumberLabel').textContent
	},()=>{
		console.log('saved');
		
	})

}