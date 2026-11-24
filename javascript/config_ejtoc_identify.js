//start id obj - var is in config with empty obj, idfldname is used to show values in popup

ejIdentifyJSON = {
	B_D5_PM25: {
		description: "Particulate Matter 2.5",
		mouseover: "Annual average concentration of particles 2.5 microns or smaller in air",
		legendtitle: "EJ Index  Particulate Matter 2.5",
		txtname: "T_D5_PM25",
		idfldname: "T_DEMOGIDX_5,T_D5_PM25",
		cat: "P_EJ2",
		hovertext:
			"EJ Indexes: Particulate Matter 2.5 – Fine particulate matter levels in the air",
		category: "P_EJ2",
		nationalServiceURL: ejscreenservice, //defined in config.js file
		stateServiceURL: ejscreenservice,
		ejmapindex: ejmapindex,
		ejmapindex_state: ejmapindex_state,
	},
	B_D5_OZONE: {
		description: "Ozone",
		mouseover: "Average of maximum daily ozone concentrations in air",
		legendtitle: "EJ Index  Ozone",
		txtname: "T_D5_OZONE",
		idfldname: "T_DEMOGIDX_5,T_D5_OZONE",
		cat: "P_EJ2",
		hovertext: "EJ Indexes: Ozone - Ozone level in the air",
		category: "P_EJ2",
		nationalServiceURL: ejscreenservice, //defined in config.js file
		stateServiceURL: ejscreenservice,
		ejmapindex: ejmapindex,
		ejmapindex_state: ejmapindex_state,
	},	
	B_D5_NO2: {
		description: "Nitrogen Dioxide (NO\u2082)",
		mouseover: "Annual average concentration of NO\u2082 levels in air",
		legendtitle:
			"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nitrogen Dioxide (NO\u2082)",
		txtname: "T_D5_NO2",
		idfldname: "T_DEMOGIDX_5,T_D5_NO2",
		cat: "P_EJ2",
		hovertext:
			"EJ Indexes: Nitrogen Dioxide (NO\u2082)",
		category: "P_EJ2",
		nationalServiceURL: ejscreenservice, //defined in config.js file
		stateServiceURL: ejscreenservice,
		ejmapindex: ejmapindex,
		ejmapindex_state: ejmapindex_state,
		formatter: {						
			"aliasnew":{"T_NO2":"Nitrogen Dioxide (NO<sub>2</sub>)","T_D5_NO2":"Nitrogen Dioxide (NO<sub>2</sub>)"}			
			}
	},
	B_D5_DSLPM: {
		description: "Diesel Particulate Matter",
		mouseover: "Concentration of diesel particulate matter in air",
		legendtitle:
			"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Diesel Particulate Matter",
		txtname: "T_D5_DSLPM",
		idfldname: "T_DEMOGIDX_5,T_D5_DSLPM",
		cat: "P_EJ2",
		hovertext:
			"EJ Indexes: Diesel Particulate Matter - Diesel particulate matter level in the air",
		category: "P_EJ2",
		nationalServiceURL: ejscreenservice, //defined in config.js file
		stateServiceURL: ejscreenservice,
		ejmapindex: ejmapindex,
		ejmapindex_state: ejmapindex_state,
	},
	B_D5_RSEI_AIR: {
		description: "Toxic Releases to Air",
		mouseover: "Average annual chemical concentrations in air weighted by relative toxicity",
		legendtitle:
			"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Toxic Releases to Air",
		txtname: "T_D5_RSEI_AIR",
		idfldname: "T_DEMOGIDX_5,T_D5_RSEI_AIR",
		cat: "P_EJ5",
		hovertext:
			"EJ Indexes: Toxic Releases to Air",
		category: "P_EJ5",
		nationalServiceURL: ejscreenservice, //defined in config.js file
		stateServiceURL: ejscreenservice,
		ejmapindex: ejmapindex,
		ejmapindex_state: ejmapindex_state,
	},
	B_D5_PTRAF: {
		description: "Traffic Proximity",
		mouseover: "Count of vehicles per day at major roads divided by distance",
		legendtitle:
			"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Traffic Proximity",
		txtname: "T_D5_PTRAF",
		idfldname: "T_DEMOGIDX_5,T_D5_PTRAF",
		cat: "P_EJ2",
		hovertext:
			"EJ Indexes: Traffic Proximity - Count of vehicles per day at major roads divided by the distance",
		category: "P_EJ2",
		nationalServiceURL: ejscreenservice, //defined in config.js file
		stateServiceURL: ejscreenservice,
		ejmapindex: ejmapindex,
		ejmapindex_state: ejmapindex_state,
	},
	B_D5_LDPNT: {
		description: "Lead Paint",
		mouseover: "Housing built before 1960, as indicator of potential exposure to lead paint",
		legendtitle:
			"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lead Paint",
		txtname: "T_D5_LDPNT",
		idfldname: "T_DEMOGIDX_5,T_D5_LDPNT",
		cat: "P_EJ2",
		hovertext:
			"EJ Indexes: Lead Paint - Percent of housing built before 1960",
		category: "P_EJ2",
		nationalServiceURL: ejscreenservice, //defined in config.js file
		stateServiceURL: ejscreenservice,
		ejmapindex: ejmapindex,
		ejmapindex_state: ejmapindex_state,
	},
	B_D5_PNPL: {
		description: "Superfund Proximity",
		mouseover: "Count of proposed and listed NPL (National Priorities List) sites divided by distance",
		legendtitle:
			"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Superfund Proximity",
		txtname: "T_D5_PNPL",
		idfldname: "T_DEMOGIDX_5,T_D5_PNPL",
		cat: "P_EJ2",
		hovertext:
			"EJ Indexes: Superfund Proximity - Count of National Priorities List/Superfund sites divided by the distance",
		category: "P_EJ2",
		nationalServiceURL: ejscreenservice, //defined in config.js file
		stateServiceURL: ejscreenservice,
		ejmapindex: ejmapindex,
		ejmapindex_state: ejmapindex_state,
	},
	B_D5_PRMP: {
		description: "RMP Facility Proximity",
		mouseover: "Count of facilities with required Risk Management Plans divided by distance",
		legendtitle:
			"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RMP Facility Proximity",
		txtname: "T_D5_PRMP",
		idfldname: "T_DEMOGIDX_5,T_D5_PRMP",
		cat: "P_EJ2",
		hovertext:
			"EJ Indexes: RMP Facility Proximity - Count of facilities with Risk Management Plans divided by the distance",
		category: "P_EJ2",
		nationalServiceURL: ejscreenservice, //defined in config.js file
		stateServiceURL: ejscreenservice,
		ejmapindex: ejmapindex,
		ejmapindex_state: ejmapindex_state,
	},
	B_D5_PTSDF: {
		description: "Hazardous Waste Proximity",
		mouseover: "Count of TSDFs and LQGs divided by distance",
		legendtitle:
			"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hazardous Waste Proximity",
		txtname: "T_D5_PTSDF",
		idfldname: "T_DEMOGIDX_5,T_D5_PTSDF",
		cat: "P_EJ2",
		hovertext:
			"EJ Indexes: Waste Facility Proximity - Count of Transfer, Storage, and Disposal Facilities divided by the distance",
		category: "P_EJ2",
		nationalServiceURL: ejscreenservice, //defined in config.js file
		stateServiceURL: ejscreenservice,
		ejmapindex: ejmapindex,
		ejmapindex_state: ejmapindex_state,
	},
	B_D5_UST: {
		description: "Underground Storage Tanks",
		mouseover: "Count of Leaking UST and USTs within a buffered block group",
		legendtitle:
			"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Underground Storage Tanks",
		txtname: "T_D5_UST",
		idfldname: "T_DEMOGIDX_5,T_D5_UST",
		cat: "P_EJ2",
		hovertext:
			"EJ Indexes: Underground Storage Tanks - UST facilities/square km",
		category: "P_EJ2",
		nationalServiceURL: ejscreenservice, //defined in config.js file
		stateServiceURL: ejscreenservice,
		ejmapindex: ejmapindex,
		ejmapindex_state: ejmapindex_state,
	},
	B_D5_PWDIS: {
		description: "Wastewater Discharge",
		mouseover: "Average annual chemical concentrations in water weighted by relative toxicity",
		legendtitle:
			"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Wastewater Discharge",
		txtname: "T_D5_PWDIS",
		idfldname: "T_DEMOGIDX_2,T_D5_PWDIS",
		cat: "P_EJ2",
		hovertext:
			"EJ Indexes: Wastewater Discharge - Toxicity-weighted concentration/meter distance",
		category: "P_EJ2",
		nationalServiceURL: ejscreenservice, //defined in config.js file
		stateServiceURL: ejscreenservice,
		ejmapindex: ejmapindex,
		ejmapindex_state: ejmapindex_state,
	},
	B_D5_DWATER: {
		description: "Drinking Water Non-Compliance",
		mouseover: "Number of drinking water violations for community water systems in non-compliance",
		legendtitle:
			"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Drinking Water Non-Compliance",
		txtname: "T_D5_DWATER",
		idfldname: "T_DEMOGIDX_5,T_D5_DWATER",
		cat: "P_EJ2",
		hovertext:
			"EJ Indexes: Drinking Water Non-Compliance",
		category: "P_EJ2",
		nationalServiceURL: ejscreenservice, //defined in config.js file
		stateServiceURL: ejscreenservice,
		ejmapindex: ejmapindex,
		ejmapindex_state: ejmapindex_state,
	},
	B_D2_PM25: {
		description: "Particulate Matter 2.5",
		legendtitle: "EJ Index  Particulate Matter 2.5",
		txtname: "T_D2_PM25",
		idfldname: "T_DEMOGIDX_2,T_D2_PM25",
		cat: "P_EJ2",
		hovertext:
			"EJ Indexes: Particulate Matter 2.5 - Annual average concentration of particles 2.5 microns or smaller in air",
		category: "P_EJ2",
	},
	B_D2_OZONE: {
		description: "Ozone",
		legendtitle: "EJ Index  Ozone",
		txtname: "T_D2_OZONE",
		idfldname: "T_DEMOGIDX_2,T_D2_OZONE",
		cat: "P_EJ2",
		hovertext: "EJ Indexes: Ozone - Ozone level in the air",
		category: "P_EJ2",
	},
	B_D2_NO2: {
		description: "Nitrogen Dioxide (NO\u2082)",
		legendtitle:
			"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nitrogen Dioxide (NO\u2082)",
		txtname: "T_D2_NO2",
		idfldname: "T_DEMOGIDX_2,T_D2_NO2",
		cat: "P_EJ2",
		hovertext:
			"EJ Indexes:Nitrogen Dioxide (NO\u2082)",
		category: "P_EJ2",
		formatter: {						
			"aliasnew":{"T_NO2":"Nitrogen Dioxide (NO<sub>2</sub>)","T_D2_NO2":"Nitrogen Dioxide (NO<sub>2</sub>)"}			
			}
	},
	B_D2_DSLPM: {
		description: "Diesel Particulate Matter",
		legendtitle:
			"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Diesel Particulate Matter",
		txtname: "T_D2_DSLPM",
		idfldname: "T_DEMOGIDX_2,T_D2_DSLPM",
		cat: "P_EJ2",
		hovertext:
			"EJ Indexes: Diesel Particulate Matter - Diesel particulate matter level in the air",
		category: "P_EJ2",
	},		
	B_D2_RSEI_AIR: {
		description: "Toxic Releases to Air",
		legendtitle:
			"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Toxic Releases to Air",
		txtname: "T_D2_RSEI_AIR",
		idfldname: "T_DEMOGIDX_2,T_D2_RSEI_AIR",
		cat: "P_EJ2",
		hovertext:
			"EJ Indexes:Toxic Releases to Air",
		category: "P_EJ2",
	},
	B_D2_PTRAF: {
		description: "Traffic Proximity",
		legendtitle:
			"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Traffic Proximity",
		txtname: "T_D2_PTRAF",
		idfldname: "T_DEMOGIDX_2,T_D2_PTRAF",
		cat: "P_EJ2",
		hovertext:
			"EJ Indexes: Traffic Proximity - Count of vehicles per day at major roads divided by the distance",
		category: "P_EJ2",
	},
	B_D2_LDPNT: {
		description: "Lead Paint",
		legendtitle:
			"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lead Paint",
		txtname: "T_D2_LDPNT",
		idfldname: "T_DEMOGIDX_2,T_D2_LDPNT",
		cat: "P_EJ2",
		hovertext: "EJ Indexes: Lead Paint - Percent of housing built before 1960",
		category: "P_EJ2",
	},
	B_D2_PNPL: {
		description: "Superfund Proximity",
		legendtitle:
			"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Superfund Proximity",
		txtname: "T_D2_PNPL",
		idfldname: "T_DEMOGIDX_2,T_D2_PNPL",
		cat: "P_EJ2",
		hovertext:
			"EJ Indexes: Superfund Proximity - Count of National Priorities List/Superfund sites divided by the distance",
		category: "P_EJ2",
	},
	B_D2_PRMP: {
		description: "RMP Facility Proximity",
		legendtitle:
			"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RMP Facility Proximity",
		txtname: "T_D2_PRMP",
		idfldname: "T_DEMOGIDX_2,T_D2_PRMP",
		cat: "P_EJ2",
		hovertext:
			"EJ Indexes: RMP Facility Proximity - Count of facilities with Risk Management Plans divided by the distance",
		category: "P_EJ2",
	},
	B_D2_PTSDF: {
		description: "Hazardous Waste Proximity",
		legendtitle:
			"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hazardous Waste Proximity",
		txtname: "T_D2_PTSDF",
		idfldname: "T_DEMOGIDX_2,T_D2_PTSDF",
		cat: "P_EJ2",
		hovertext:
			"EJ Indexes: Waste Facility Proximity - Count of Transfer, Storage, and Disposal Facilities divided by the distance",
		category: "P_EJ2",
	},
	B_D2_UST: {
		description: "Underground Storage Tanks",
		legendtitle:
			"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Underground Storage Tanks",
		txtname: "T_D2_UST",
		idfldname: "T_DEMOGIDX_2,T_D2_UST",
		cat: "P_EJ2",
		hovertext:
			"EJ Indexes: Underground Storage Tanks - UST facilities/square km",
		category: "P_EJ2",
	},
	B_D2_PWDIS: {
		description: "Wastewater Discharge",
		legendtitle:
			"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Wastewater Discharge",
		txtname: "T_D2_PWDIS",
		idfldname: "T_DEMOGIDX_2,T_D2_PWDIS",
		cat: "P_EJ2",
		hovertext:
			"EJ Indexes: Wastewater Discharge - Toxicity-weighted concentration/meter distance",
		category: "P_EJ2",
	},
	B_D2_DWATER: {
		description: "Drinking Water Non-Compliance",
		legendtitle:
			"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Drinking Water Non-Compliance",
		txtname: "T_D2_DWATER",
		idfldname: "T_DEMOGIDX_2,T_D2_DWATER",
		cat: "P_EJ2",
		hovertext:
			"EJ Indexes: Drinking Water Non-Compliance",
		category: "P_EJ2",
	},
	B_PM25: {
		description: "Particulate Matter 2.5",
		legendtitle: "Environmental Data Particulate Matter 2.5",
		txtname: "T_PM25", //not actually used?
		idfldname: "DEMOGIDX_2,PM25,P_PM25",
		cat: "P_ENV",
		hovertext:
			"Environmental Indicators: PM 2.5 - Annual average concentration of particles 2.5 microns or smaller in air",
		category: "P_ENV",
		formatter: {
			//optional format parameters
			"suffixtext":{"PM25":"score","T_PM25":"percentile"},//text appended to alias, can be suffixtext or prefixtext
			"aliasnew":{"PM25":"Particulate Matter 2.5"}, //override default alias
			"signifdigits":{"PM25":3, "P_PM25": 3, "DEMOGIDX_2": 3},//number of decimal places, if category is p_env this is used for significant digits
			"units":{"PM25":"µg/m3", "P_PM25": "%ile", "DEMOGIDX_2": ""} //field unit of measure appended to value			
			}
	},
	B_OZONE: {
		description: "Ozone",
		legendtitle: "Environmental Data Ozone",
		txtname: "T_OZONE",
		idfldname: "T_DEMOGIDX_2,OZONE, T_OZONE",
		cat: "P_ENV",
		hovertext: "Environmental Indicators: Ozone - Ozone level in the air",
		category: "P_ENV",
		formatter: {			
			"suffixtext":{"OZONE":"score","T_OZONE":"percentile"},
			"aliasnew":{"OZONE":"Ozone"}, 
			"signifdigits":{"OZONE":3},
			"units":{"OZONE":"ppb"} 		
			}
	},
	B_NO2: {
		description: "Nitrogen Dioxide (NO\u2082)",
		legendtitle:
			"Environmental Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nitrogen Dioxide (NO\u2082)",
		txtname: "T_NO2",
		idfldname: "T_DEMOGIDX_2,NO2,T_NO2",
		cat: "P_ENV",
		hovertext:
			"Environmental Indicators: Nitrogen Dioxide (NO\u2082)",
		category: "P_ENV",
		formatter: {			
			"suffixtext":{"NO2":"score","T_NO2":"percentile"},
			"aliasnew":{"NO2":"Nitrogen Dioxide (NO<sub>2</sub>)","T_NO2":"Nitrogen Dioxide (NO<sub>2</sub>)"}, 
			"signifdigits":{"NO2":2},
			"units":{"NO2":"ppbv"} 		
			}
	},	
	B_DSLPM: {
		description: "Diesel Particulate Matter",
		legendtitle:
			"Environmental Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Diesel Particulate Matter",
		txtname: "T_DSLPM",
		idfldname: "T_DEMOGIDX_2,DSLPM,T_DSLPM",
		cat: "P_ENV",
		hovertext:
			"Environmental Indicators: Diesel Particulate Matter - Diesel particulate matter level in the air",
		category: "P_ENV",
		formatter: {			
			"suffixtext":{"DSLPM":"score","T_DSLPM":"percentile"},
			"aliasnew":{"DSLPM":"Diesel Particulate Matter"}, 
			"signifdigits":{"DSLPM":3},
			"units":{"DSLPM":"µg/m3"} 		
			}
	},
	B_RSEI_AIR : {
		description: "Toxic Releases to Air",
		legendtitle:
			"Environmental Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Toxic Releases to Air",
		txtname: "T_RSEI_AIR",
		idfldname: "T_DEMOGIDX_2,RSEI_AIR,T_RSEI_AIR",
		cat: "P_ENV",
		hovertext:
			"Environmental Indicators: Toxic Releases to Air",
		category: "P_ENV",
		formatter: {			
			"suffixtext":{"RSEI_AIR":"score","T_RSEI_AIR":"percentile"},
			"aliasnew":{"RSEI_AIR":"Toxic Releases to Air"}, 
			"signifdigits":{"RSEI_AIR":2},
			"units":{"RSEI_AIR":" (toxicity-weighted concentration)"} 		
			}
	},
	B_PTRAF: {
		description: "Traffic Proximity",
		legendtitle:
			"Environmental Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Traffic Proximity",
		txtname: "T_PTRAF",
		idfldname: "T_DEMOGIDX_2,PTRAF,T_PTRAF",
		cat: "P_ENV",
		hovertext:
			"Environmental Indicators: Traffic Proximity - Count of vehicles per day at major roads divided by the distance",
		category: "P_ENV",
		formatter: {			
			"suffixtext":{"PTRAF":"score","T_PTRAF":"percentile"},
			"aliasnew":{"PTRAF":"Traffic Proximity"}, 
			"signifdigits":{"PTRAF":2},
			"units":{"PTRAF":"(daily count/distance)"} 		
			}
	},
	B_LDPNT: {
		description: "Lead Paint",
		legendtitle:
			"Environmental Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lead Paint",
		txtname: "T_LDPNT",
		idfldname: "T_DEMOGIDX_2,PRE1960PCT,T_LDPNT",
		cat: "P_ENV",
		hovertext:
			"Environmental Indicators: Lead Paint - Percent of housing built before 1960",
		category: "P_ENV",
		formatter: {			
			"suffixtext":{"PRE1960PCT":"score","T_LDPNT":"percentile"},
			"aliasnew":{"PRE1960PCT":"Lead Paint"}, 
			"signifdigits":{"PRE1960PCT":2},
			"units":{"PRE1960PCT":"(% Pre-1960 Housing)"} 		
			}
	},
	B_PNPL: {
		description: "Superfund Proximity",
		legendtitle:
			"Environmental Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Superfund Proximity",
		txtname: "T_PNPL",
		idfldname: "T_DEMOGIDX_2,PNPL,T_PNPL",
		cat: "P_ENV",
		hovertext:
			"Environmental Indicators: Superfund Proximity - Count of National Priorities List/Superfund sites divided by the distance",
		category: "P_ENV",
		formatter: {			
			"suffixtext":{"PNPL":"score","T_PNPL":"percentile"},
			"aliasnew":{"PNPL":"Superfund Proximity"}, 
			"signifdigits":{"PNPL":2},
			"units":{"PNPL":"(site/km)"} 		
			}
	},
	B_PRMP: {
		description: "RMP Facility Proximity",
		legendtitle:
			"Environmental Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RMP Facility Proximity",
		txtname: "T_PRMP",
		idfldname: "T_DEMOGIDX_2,PRMP,T_PRMP",
		cat: "P_ENV",
		hovertext:
			"Environmental Indicators: RMP Facility Proximity - Count of facilities with Risk Management Plans divided by the distance",
		category: "P_ENV",
		formatter: {			
			"suffixtext":{"PRMP":"score","T_PRMP":"percentile"},
			"aliasnew":{"PRMP":"RMP Facility Proximity"}, 
			"signifdigits":{"PRMP":2},
			"units":{"PRMP":"(facility/km)"} 		
			}
	},
	B_PTSDF: {
		description: "Hazardous Waste Proximity",
		legendtitle:
			"Environmental Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hazardous Waste Proximity",
		txtname: "T_PTSDF",
		idfldname: "T_DEMOGIDX_2,PTSDF,T_PTSDF",
		cat: "P_ENV",
		hovertext:
			"Environmental Indicators: Waste Facility Proximity - Count of Transfer, Storage, and Disposal Facilities divided by the distance",
		category: "P_ENV",
		formatter: {			
			"suffixtext":{"PTSDF":"score","T_PTSDF":"percentile"},
			"aliasnew":{"PTSDF":"Hazardous Waste Proximity"}, 
			"signifdigits":{"PTSDF":2},
			"units":{"PTSDF":"(facility/km)"} 		
			}
	},
	B_UST: {
		description: "Underground Storage Tanks",
		legendtitle:
			"Environmental Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Underground Storage Tanks",
		txtname: "T_UST",
		idfldname: "T_DEMOGIDX_2,UST,T_UST",
		cat: "P_ENV",
		hovertext:
			"Environmental Indicatores: Underground Storage Tanks - UST facilities/square km",
		category: "P_ENV",
		formatter: {			
			"suffixtext":{"UST":"score","T_UST":"percentile"},
			"aliasnew":{"UST":"Underground Storage Tanks"}, 
			"signifdigits":{"UST":2},
			"units":{"UST":"(count/km2)"} 		
			}
	},
	B_PWDIS: {
		description: "Wastewater Discharge",
		legendtitle:
			"Environmental Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Wastewater Discharge",
		txtname: "T_PWDIS",
		idfldname: "T_DEMOGIDX_2,PWDIS,T_PWDIS",
		cat: "P_ENV",
		hovertext:
			"Environmental Indicators: Wastewater Discharge - Toxicity-weighted concentration/meter distance",
		category: "P_ENV",
		formatter: {			
			"suffixtext":{"PWDIS":"score","T_PWDIS":"percentile"},
			"aliasnew":{"PWDIS":"Wastewater Discharge"}, 
			"signifdigits":{"PWDIS":2},
			"units":{"PWDIS":" (toxicity-weighted concentration/m)"} 		
			}
	},
	B_DWATER: {
		description: "Drinking Water Non-Compliance",
		legendtitle:
			"Environmental Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Drinking Water Non-Compliance",
		txtname: "T_DWATER",
		idfldname: "T_DEMOGIDX_2,DWATER,T_DWATER",
		cat: "P_ENV",
		hovertext:
			"Environmental Indicators: Drinking Water Non-Compliance",
		category: "P_ENV",
		formatter: {			
			"suffixtext":{"T_DWATER":"percentile"},
			"aliasnew":{"DWATER":"Drinking Water Non-Compliance","T_DWATER":"Drinking Water Non-Compliance"}, 
			"signifdigits":{"DWATER":2},
			"units":{"DWATER":" (points)"} 		
			}
	},
	B_DEMOGIDX_2: {
		description: "Demographic Index",
		legendtitle:
			"Demographic Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Demographic Index",
		txtname: "T_DEMOGIDX_2",
		idfldname:
			"T_DEMOGIDX_5,DEMOGIDX_2,T_DEMOGIDX_2",
		cat: "P_DEM",
		hovertext:
			"Demographic Indicators: Demographic Index - Combination of percent low-income and percent minority",
		category: "P_DEM",
		formatter: {			
			"suffixtext":{"DEMOGIDX_2":"score","T_DEMOGIDX_2":"percentile"},
			"aliasnew":{"DEMOGIDX_2":"Demographic Index"},
			"roundplaces":{"DEMOGIDX_2":2}
							
			}
	},
	B_DEMOGIDX_5: {
		description: "Supplemental Demographic Index",
		legendtitle:
			"Demographic Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Demographic Index",
		txtname: "T_DEMOGIDX_5",
		idfldname:
			"T_DEMOGIDX_2,DEMOGIDX_5,T_DEMOGIDX_5",
		cat: "P_DEM",
		hovertext:
			"Demographic Indicators: Demographic Index - Combination of percent low-income and percent minority",
		category: "P_DEM",
		formatter: {			
			"suffixtext":{"DEMOGIDX_5":"score","T_DEMOGIDX_5":"percentile"},
			"aliasnew":{"DEMOGIDX_5":"Supplemental Demographic Index"},
			"roundplaces":{"DEMOGIDX_5":2}			
			}
	},
	B_PEOPCOLORPCT: {
		description: "People of Color",
		legendtitle:
			"Demographic Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;People of Color",
		txtname: "T_PEOPCOLORPCT",
		idfldname:
			"T_DEMOGIDX_5,T_DEMOGIDX_2,PEOPCOLORPCT,T_PEOPCOLORPCT",		
		cat: "P_DEM",
		hovertext:
			"Demographic Indicators: People of Color - All people except for Non-Hispanic white as defined by the U.S. Census",
		category: "P_DEM",
		formatter: {	
			"prefixtext":{"PEOPCOLORPCT":"Percent"},		
			"suffixtext":{"T_PEOPCOLORPCT":"percentile"},
			"aliasnew":{"PEOPCOLORPCT":"people of color"}, 
			"ispercent":{"PEOPCOLORPCT":true},	
			"multiplier":{"PEOPCOLORPCT":100},	
			"pctsign":{"PEOPCOLORPCT":"%"}	
			}
	},
	B_LOWINCPCT: {
		description: "Low Income",
		legendtitle:
			"Demographic Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Low Income",
		txtname: "T_LOWINCPCT",
		idfldname:
			"T_DEMOGIDX_5,T_DEMOGIDX_2,LOWINCPCT,T_LOWINCPCT",
		cat: "P_DEM",
		hovertext:
			"Demographic Indicators: Low Income - Individuals whose income is less than two times the poverty level",
		category: "P_DEM",
		formatter: {	
			"prefixtext":{"LOWINCPCT":"Percent"},		
			"suffixtext":{"T_LOWINCPCT":"percentile"},
			"aliasnew":{"LOWINCPCT":"low income"}, 
			"ispercent":{"LOWINCPCT":true},
			"multiplier":{"LOWINCPCT":100},	
			"pctsign":{"LOWINCPCT":"%"}				
			}
	},
	B_LINGISOPCT: {
		description: "Limited English Speaking",
		legendtitle:
			"Demographic Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Limited English Speaking",
		txtname: "T_LINGISOPCT",
		idfldname:
			"T_DEMOGIDX_5,T_DEMOGIDX_2,LINGISOPCT,T_LINGISOPCT",
		cat: "P_DEM",
		hovertext:
			'Demographic Indicators: Limited English Speaking - Households in which no one over age 14 speaks English "very well"',
		category: "P_DEM",
		formatter: {	
			"prefixtext":{"LINGISOPCT":"Percent"},		
			"suffixtext":{"T_LINGISOPCT":"percentile"},
			"aliasnew":{"LINGISOPCT":"limited english speaking"}, 
			"ispercent":{"LINGISOPCT":true},
			"multiplier":{"LINGISOPCT":100},	
			"pctsign":{"LINGISOPCT":"%"}				
			}
	},
	B_LESSHSPCT: {
		description: "Less Than High School Education",
		legendtitle:
			"Demographic Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Less Than High School Education",
		txtname: "T_LESSHSPCT",
		idfldname:
			"T_DEMOGIDX_5,T_DEMOGIDX_2,LESSHSPCT,T_LESSHSPCT",
		cat: "P_DEM",
		hovertext:
			"Demographic Indicators: Less Than High School Education - Individuals age 25 and over with less than high school degree",
		category: "P_DEM",
		formatter: {	
			"prefixtext":{"LESSHSPCT":"Percent"},		
			"suffixtext":{"T_LESSHSPCT":"percentile"},
			"aliasnew":{"LESSHSPCT":"less than high school education"}, 
			"ispercent":{"LESSHSPCT":true},
			"multiplier":{"LESSHSPCT":100},	
			"pctsign":{"LESSHSPCT":"%"}			
			}
	},
	B_UNDER5PCT: {
		description: "Under Age 5",
		legendtitle:
			"Demographic Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Under Age 5",
		txtname: "T_UNDER5PCT",
		idfldname:
			"T_DEMOGIDX_5,T_DEMOGIDX_2,UNDER5PCT,T_UNDER5PCT",
		cat: "P_DEM",
		hovertext: "Demographic Indicators: Population under Age 5",
		category: "P_DEM",
		formatter: {	
			"prefixtext":{"UNDER5PCT":"Percent"},		
			"suffixtext":{"T_UNDER5PCT":"percentile"},
			"aliasnew":{"UNDER5PCT":"under age 5"}, 
			"ispercent":{"UNDER5PCT":true},
			"multiplier":{"UNDER5PCT":100},	
			"pctsign":{"UNDER5PCT":"%"}			
			}
	},
	B_OVER64PCT: {
		description: "Over Age 64",
		legendtitle:
			"Demographic Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Over Age 64",
		txtname: "T_OVER64PCT",
		idfldname:
			"T_DEMOGIDX_5,T_DEMOGIDX_2,OVER64PCT,T_OVER64PCT",
		cat: "P_DEM",
		hovertext: "Demographic Indicators: Population over Age 64",
		category: "P_DEM",
		formatter: {	
			"prefixtext":{"OVER64PCT":"Percent"},		
			"suffixtext":{"T_OVER64PCT":"percentile"},
			"aliasnew":{"OVER64PCT":"over age 64"}, 
			"ispercent":{"OVER64PCT":true},
			"multiplier":{"OVER64PCT":100},	
			"pctsign":{"OVER64PCT":"%"}				
			}
	},
	B_DISABILITYPCT: {
		description: "Persons with Disabilities",
		legendtitle:
			"Demographic Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Persons with Disabilities",
		txtname: "T_DISABILITYPCT",
		idfldname:
			"T_DEMOGIDX_5,T_DEMOGIDX_2,DISABILITYPCT,T_DISABILITYPCT",
		cat: "P_DEM",
		hovertext: "Demographic Indicators: Persons with Disabilities",
		category: "P_DEM",
		formatter: {	
			"prefixtext":{"DISABILITYPCT":"Percent"},		
			"suffixtext":{"T_DISABILITYPCT":"percentile"},
			"aliasnew":{"DISABILITYPCT":"persons with disabilities","T_DISABILITYPCT":"Persons with Disabilities"}, 
			"ispercent":{"DISABILITYPCT":true},
			"multiplier":{"DISABILITYPCT":100},	
			"pctsign":{"DISABILITYPCT":"%"}				
			}
	},
	B_UNEMPPCT: {
		description: "Unemployment Rate",
		legendtitle:
			"Demographic Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Unemployment Rate",
		txtname: "T_DISABILITYPCT",
		idfldname:
			"T_DEMOGIDX_5,T_DEMOGIDX_2,UNEMPPCT,T_UNEMPPCT",
		cat: "P_DEM",
		hovertext: "Demographic Indicators: Unemployment Rate",
		category: "P_DEM",
		formatter: {	
			//"prefixtext":{"UNEMPPCT":"Percent"},		
			"suffixtext":{"T_UNEMPPCT":"percentile"},
			"aliasnew":{"UNEMPPCT":"Unemployment rate"}, 
			"ispercent":{"UNEMPPCT":true},
			"multiplier":{"UNEMPPCT":100},	
			"pctsign":{"UNEMPPCT":"%"}				
			}
	},
	B_95: {
		description: "Over 95th Percentile",
		legendtitle: "Over 95th Percentile",
		txtname: "T_95",
		idfldname:
			"EXCEED_COUNT,T_D2_PM25,T_D2_OZONE,T_D2_DSLPM,T_D2_CANCR,T_D2_RESP,T_D2_RSEI_AIR,T_D2_LDPNT,T_D2_PTRAF,T_D2_PNPL,T_D2_PRMP,T_D2_PTSDF,T_D2_PWDIS,ID,ST_ABBREV",
		cat: "P_MUL",
		hovertext:
			"Areas where at least one EJ index is at or above the 95th percentile",
		category: "P_MUL",
	},
	B_90: {
		description: "Over 90th Percentile",
		legendtitle: "Over 90th Percentile",
		txtname: "T_90",
		idfldname:
			"EXCEED_COUNT,T_D2_PM25,T_D2_OZONE,T_D2_DSLPM,T_D2_CANCER,T_D2_RESP,T_D2_RSEI_AIR,T_LDPNT_D2,T_D2_PTRAF,T_D2_PNPL,T_D2_PRMP,T_D2_PTSDF,T_D2_PWDIS,ID,ST_ABBREV",
		cat: "P_MUL",
		hovertext:
			"Areas where at least one EJ index is at or above the 90th percentile",
		category: "P_MUL",
	},
	B_80: {
		description: "Over 80th Percentile",
		legendtitle: "Over 80th Percentile",
		txtname: "T_95",
		idfldname:
			"EXCEED_COUNT,T_D2_PM25,T_D2_OZONE,T_D2_DSLPM,T_D2_CANCR,T_D2_RESP,T_D2_RSEI_AIR,T_D2_LDPNT,T_D2_PTRAF,T_D2_PNPL,T_D2_PRMP,T_D2_PTSDF,T_D2_PWDIS,ID,ST_ABBREV",
		cat: "P_MUL",
		hovertext:
			"Areas where at least one EJ index is at or above the 80th percentile",
		category: "P_MUL",
	},
	B_75: {
		description: "Over 75th Percentile",
		legendtitle: "Over 75th Percentile",
		txtname: "T_95",
		idfldname:
			"EXCEED_COUNT,T_D2_PM25,T_D2_OZONE,T_D2_DSLPM,T_D2_CANCR,T_D2_RESP,T_D2_RSEI_AIR,T_D2_LDPNT,T_D2,T_D2_PNPL,T_D2_PRMP,T_D2_PTSDF,T_D2_PWDIS,ID,ST_ABBREV",
		cat: "P_MUL",
		hovertext:
			"Areas where at least one EJ index is at or above the 75th percentile",
		category: "P_MUL",
	},
	lifeexpentancy_map: {
		//description: "T_LIFEEXPPCT",
		legendtitle: "Low Life Expectancy",
		txtname: "T_LIFEEXPPCT",
		idfldname: "ID,ST_ABBREV,T_LIFEEXPPCT,LIFEEXPPCT",
		cat: "T_LIFEEXPPCT",
		hovertext: "Low Life Expectancy",
		category: "T_LIFEEXPPCT",
		formatter: {
			//optional format parameters
			"suffixtext": { "LIFEEXPPCT ": "score", "T_LIFEEXPPCT": "percentile" },//text appended to alias, can be suffixtext or prefixtext
			"aliasnew": { "ID": "Blockgroup ID", "LIFEEXPPCT ": "Low Life Expectancy", "ST_ABBREV": "State" }, //override default alias
			//"signifdigits":{"LIFEEXPPCT":0},//number of decimal places, if category is p_env this is used for significant digits
			"ispercent": { "LIFEEXPPCT": true },
			"units": { "LIFEEXPPCT": "(index)" }, //field unit of measure appended to value			
			"multiplier": { "LIFEEXPPCT": 100 },
		}
	},

	heartdisease_map: {
		description: "T_HEARTDISEASE",
		legendtitle: "Heart Disease",
		txtname: "T_HEARTDISEASE",
		idfldname: "ID,ST_ABBREV,T_HEARTDISEASE,HEARTDISEASE",
		cat: "T_HEARTDISEASE",
		hovertext:
			"Heart Disease",
		category: "T_HEARTDISEASE",
		formatter: {
			//optional format parameters
			"suffixtext": { "HEARTDISEASE": "Prevalance", "T_HEARTDISEASE": "percentile" },//text appended to alias, can be suffixtext or prefixtext
			"aliasnew": { "ID": "Blockgroup ID", "HEARTDISEASE": "Heart Disease", "ST_ABBREV": "State" }, //override default alias
			"signifdigits": { "HEARTDISEASE": 3 },//number of decimal places, if category is p_env this is used for significant digits		
		}
	},

	asthma_map: {
		description: "T_ASTHMA",
		legendtitle: "Asthma",
		txtname: "T_ASTHMA",
		idfldname: "ID,ST_ABBREV,T_ASTHMA,ASTHMA",
		cat: "T_ASTHMA",
		hovertext:
			"Asthma",
		category: "T_ASTHMA",
		formatter: {
			//optional format parameters
			"suffixtext": { "ASTHMA": "Prevalance", "T_ASTHMA": "percentile" },//text appended to alias, can be suffixtext or prefixtext
			"aliasnew": { "ID": "Blockgroup ID", "ASTHMA": "Asthma", "ST_ABBREV": "State" }, //override default alias
			"signifdigits": { "ASTHMA": 3 },
		}
	},


	cancer_map: {
		description: "T_CANCER",
		legendtitle: "Cancer",
		txtname: "T_CANCER",
		idfldname: "ID,ST_ABBREV,T_CANCER,CANCER",
		cat: "T_CANCER",
		hovertext: "Cancer",
		category: "T_CANCER",
		formatter: {
			//optional format parameters
			"suffixtext": { "CANCER": "Prevalance", "T_CANCER": "percentile" },//text appended to alias, can be suffixtext or prefixtext
			"aliasnew": { "ID": "Blockgroup ID", "CANCER ": "Cancer", "ST_ABBREV": "State" }, //override default alias
			"signifdigits": { "CANCER": 3 },
		}
	},

	personswithdisabilities_map: {
		description: "T_DISABILITYPCT",
		legendtitle: "Persons with Disabilities",
		txtname: "T_DISABILITYPCT",
		idfldname: "ID,ST_ABBREV,T_DISABILITYPCT,DISABILITYPCT",
		cat: "T_DISABILITYPCT",
		hovertext: "Persons with Disabilities",
		category: "T_DISABILITYPCT",
		formatter: {
			//optional format parameters
			"suffixtext": { "T_DISABILITYPCT": "percentile" },//text appended to alias, can be suffixtext or prefixtext
			"aliasnew": { "ID": "Blockgroup ID", "DISABILITYPCT": "Persons with Disabilities", "ST_ABBREV": "State" }, //override default alias
			"signifdigits": { "DISABILITYPCT": 3 },//number of decimal places, if category is p_env this is used for significant digits
			"multiplier": { "DISABILITYPCT": 100 },
			"units": { "DISABILITYPCT": "%" } //field unit of measure appended to value
		}
	},
	broadband_map: {
		description: "T_LIMITEDBBPCT",
		legendtitle: "Broadband Gaps",
		txtname: "T_LIMITEDBBPCT",
		idfldname: "ID,ST_ABBREV,T_LIMITEDBBPCT,LIMITEDBBPCT",
		cat: "T_LIMITEDBBPCT",
		hovertext: "Broadband Gaps",
		category: "T_LIMITEDBBPCT",
		formatter: {
			//optional format parameters
			"suffixtext": {"T_LIMITEDBBPCT": "percentile" },//text appended to alias, can be suffixtext or prefixtext
			"aliasnew": { "ID": "Blockgroup ID", "LIMITEDBBPCT": "Broadband Gaps", "ST_ABBREV": "State" }, //override default alias
			//"signifdigits":{"LIMITEDBBPCT":2},//number of decimal places, if category is p_env this is used for significant digits
			"units": { "LIMITEDBBPCT": "% households" }, //field unit of measure appended to value	
			"roundplaces": { "LIMITEDBBPCT": 0 }
		}
	},

	nohealthinsurance_map: {
		description: "T_NOHINCPCT",
		legendtitle: "Lack of Health Insurance",
		txtname: "T_NOHINCPCT",
		idfldname: "ID,ST_ABBREV,T_NOHINCPCT,NOHINCPCT",
		cat: "T_NOHINCPCT",
		hovertext: "Lack of Health Insurance",
		category: "T_NOHINCPCT",
		formatter: {
			//optional format parameters
			"suffixtext": { "NOHINCPCT ": "score", "T_NOHINCPCT": "percentile" },//text appended to alias, can be suffixtext or prefixtext
			"aliasnew": { "ID": "Blockgroup ID", "NOHINCPCT": "Lack of Health Insurance", "ST_ABBREV": "State" }, //override default alias
			//"signifdigits":{"NOHINCPCT":2},//number of decimal places, if category is p_env this is used for significant digits
			"units": { "NOHINCPCT": "% persons" },//field unit of measure appended to value		
			"roundplaces": { "NOHINCPCT": 0 }
		}
	},
};

//end id obj

