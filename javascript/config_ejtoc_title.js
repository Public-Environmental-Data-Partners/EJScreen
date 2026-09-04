//controls label titles and order seen in TOC panel by category
var env_update = '<br><div style="background-color: #0056b3; color: white; padding: 1px 4px; display: inline-block; font-family: sans-serif; font-size: 8px; font-weight: bold; border-radius: 2px;"> Latest Env Data (2022)</div>'
var acs_update = '<br><div style="background-color: #b36b00; color: white; padding: 1px 4px; display: inline-block; font-family: sans-serif; font-size: 8px; font-weight: bold; border-radius: 2px;"> Latest Census Data (2024)</div>'
var ejJson = {
	Primary: {
		status: true,
		description: "Primary EJ Indexes",
		defaultfield: "B_D2_PM25",
		items: {
			P_EJ2: {
				description: "EJ Indexes",
				mouseover:
					"Combination of a single environmental indicator with the Demographic Index",
				selected: true,
				metalink:
					"https://www.epa.gov/ejscreen/glossary-ejscreen-terms#category-ej-indexes",
				columns: {
					B_D2_PM25: {
						description: "Particulate Matter 2.5"+env_update+acs_update,
						mouseover:"Annual average concentration of particles 2.5 microns or smaller in air",
						legendtitle: "EJ Index  Particulate Matter 2.5",
						txtname: "T_D2_PM25",
						idfldname: "T_DEMOGIDX_2,PM25,T_D2_PM25",
						cat: "P_EJ2",
						hovertext:
							"EJ Indexes: Particulate Matter 2.5 – Fine particulate matter levels in the air",
						category: "P_EJ2",
						nationalServiceURL: ejscreenservice, //defined in config.js
						stateServiceURL: ejscreenservice_state,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_D2_OZONE: {
						description: "Ozone"+env_update+acs_update,
						mouseover:"Average of maximum daily ozone concentrations in air",
						legendtitle: "EJ Index  Ozone",
						txtname: "T_D2_OZONE",
						idfldname: "T_DEMOGIDX_2,T_D2_OZONE",
						cat: "P_EJ2",
						hovertext: "EJ Indexes: Ozone - Ozone level in the air",
						category: "P_EJ2",
						nationalServiceURL: ejscreenservice, //defined in config.js
						stateServiceURL: ejscreenservice_state,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_D2_NO2: {
						description: "Nitrogen Dioxide (NO\u2082)"+acs_update,
						mouseover:"Annual average concentration of NO\u2082 levels in air",					
						legendtitle:
							"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nitrogen Dioxide (NO\u2082)",
						txtname: "T_D2_NO2",
						idfldname: "T_DEMOGIDX_2,D2_NO2,T_D2_NO2",
						cat: "P_EJ2",
						hovertext:
							"EJ Indexes: Nitrogen Dioxide (NO\u2082)",
						category: "P_EJ2",
						nationalServiceURL: ejscreenservice, //defined in config.js
						stateServiceURL: ejscreenservice_state,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_D2_DSLPM: {
						description: "Diesel Particulate Matter"+acs_update,
						mouseover:"Concentration of diesel particulate matter in air ",
						legendtitle:
							"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Diesel Particulate Matter",
						txtname: "T_D2_DSLPM",
						idfldname: "T_DEMOGIDX_2,T_D2_DSLPM",
						cat: "P_EJ2",
						hovertext:
							"EJ Indexes: Diesel Particulate Matter - Diesel particulate matter level in the air",
						category: "P_EJ2",
						nationalServiceURL: ejscreenservice, //defined in config.js
						stateServiceURL: ejscreenservice_state,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_D2_RSEI_AIR: {
						description: "Toxic Releases to Air"+acs_update,
						mouseover:"Average annual chemical concentrations in air weighted by relative toxicity",
						legendtitle:
							"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Toxic Releases to Air",
						txtname: "T_D2_RSEI_AIR",
						idfldname: "T_DEMOGIDX_2,T_D2_RSEI_AIR",
						cat: "P_EJ2",
						hovertext:
							"EJ Indexes: Toxic Releases to Air",
						category: "P_EJ2",
						nationalServiceURL: ejscreenservice, //defined in config.js
						stateServiceURL: ejscreenservice_state,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_D2_PTRAF: {
						description: "Traffic Proximity"+acs_update,
						mouseover:"Count of vehicles per day at major roads divided by distance",	
						legendtitle:
							"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Traffic Proximity",
						txtname: "T_D2_PTRAF",
						idfldname: "T_DEMOGIDX_2,T_D2_PTRAF",
						cat: "P_EJ2",
						hovertext:
							"EJ Indexes: Traffic Proximity - Count of vehicles per day at major roads divided by the distance",
						category: "P_EJ2",
						nationalServiceURL: ejscreenservice, //defined in config.js
						stateServiceURL: ejscreenservice_state,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_D2_LDPNT: {
						description: "Lead Paint"+acs_update,
						mouseover:"Housing built before 1960, as indicator of potential exposure to lead paint",						
						legendtitle:
							"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lead Paint",
						txtname: "T_D2_LDPNT",
						idfldname: "T_DEMOGIDX_2,T_D2_LDPNT",
						cat: "P_EJ2",
						hovertext:
							"EJ Indexes: Lead Paint - Percent of housing built before 1960",
						category: "P_EJ2",
						nationalServiceURL: ejscreenservice, //defined in config.js
						stateServiceURL: ejscreenservice_state,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_D2_PNPL: {
						description: "Superfund Proximity"+acs_update,
						mouseover:"Count of proposed and listed NPL (National Priorities List) sites divided by distance",	
						legendtitle:
							"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Superfund Proximity",
						txtname: "T_D2_PNPL",
						idfldname: "T_DEMOGIDX_2,T_D2_PNPL",
						cat: "P_EJ2",
						hovertext:
							"EJ Indexes: Superfund Proximity - Count of National Priorities List/Superfund sites divided by the distance",
						category: "P_EJ2",
						nationalServiceURL: ejscreenservice, //defined in config.js
						stateServiceURL: ejscreenservice_state,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_D2_PRMP: {
						description: "RMP Facility Proximity"+acs_update,
						mouseover:"Count of facilities with required Risk Management Plans divided by distance",	
						legendtitle:
							"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RMP Facility Proximity",
						txtname: "T_D2_PRMP",
						idfldname: "T_DEMOGIDX_2,T_D2_PRMP",
						cat: "P_EJ2",
						hovertext:
							"EJ Indexes: RMP Facility Proximity - Count of facilities with Risk Management Plans divided by the distance",
						category: "P_EJ2",
						nationalServiceURL: ejscreenservice, //defined in config.js
						stateServiceURL: ejscreenservice_state,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_D2_PTSDF: {
						description: "Hazardous Waste Proximity"+acs_update,
						mouseover:"Count of TSDFs and LQGs divided by distance",	
						legendtitle:
							"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hazardous Waste Proximity",
						txtname: "T_D2_PTSDF",
						idfldname: "T_DEMOGIDX_2,T_D2_PTSDF",
						cat: "P_EJ2",
						hovertext:
							"EJ Indexes: Waste Facility Proximity - Count of Transfer, Storage, and Disposal Facilities divided by the distance",
						category: "P_EJ2",
						nationalServiceURL: ejscreenservice, //defined in config.js
						stateServiceURL: ejscreenservice_state,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_D2_UST: {
						description: "Underground Storage Tanks"+acs_update,
						mouseover:"Count of Leaking UST and USTs within a buffered block group",
						legendtitle:
							"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Underground Storage Tanks",
						txtname: "T_D2_UST",
						idfldname: "T_DEMOGIDX_2,T_D2_UST",
						cat: "P_EJ2",
						hovertext:
							"EJ Indexes: Underground Storage Tanks - UST facilities/square km",
						category: "P_EJ2",
						nationalServiceURL: ejscreenservice, //defined in config.js
						stateServiceURL: ejscreenservice_state,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_D2_PWDIS: {
						description: "Wastewater Discharge"+env_update+acs_update,
						mouseover:"Average annual chemical concentrations in water weighted by relative toxicity",
						legendtitle:
							"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Wastewater Discharge",
						txtname: "T_D2_PWDIS",
						idfldname: "T_DEMOGIDX_2,T_D2_PWDIS",
						cat: "P_EJ2",
						hovertext:
							"EJ Indexes: Wastewater Discharge - Toxicity-weighted concentration/meter distance",
						category: "P_EJ2",
						nationalServiceURL: ejscreenservice, //defined in config.js
						stateServiceURL: ejscreenservice_state,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},										
					B_D2_DWATER: {
						description: "Drinking Water Non-Compliance"+acs_update,
						mouseover:"Number of drinking water violations for community water systems in non-compliance ",		
						legendtitle:
							"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Drinking Water Non-Compliance",
						txtname: "T_D2_DWATER",
						idfldname: "T_DEMOGIDX_2,D2_DWATER,T_D2_DWATER",
						cat: "P_EJ2",
						hovertext:
							"EJ Indexes: Drinking Water Non-Compliance",
						category: "P_EJ2",
						nationalServiceURL: ejscreenservice, //defined in config.js
						stateServiceURL: ejscreenservice_state,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					}

					
				},
			},
			P_DEM: {
				description: "Demographic Indicators",
				mouseover: "Demographic Indicators",
				selected: false,
				metalink:
					"https://www.epa.gov/ejscreen/glossary-ejscreen-terms#category-demographics",
				columns: {
					B_DEMOGIDX_2: {
						description: "Demographic Index"+acs_update,
						mouseover: "Average of low-income and people of color",
						legendtitle:
							"Demographic Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Demographic Index",
						txtname: "T_DEMOGIDX_2",
						idfldname:
							"T_PEOPCOLORPCT,T_LOWINCPCT,T_LINGISOPCT,T_LESSHSPCT,T_UNDER5PCT,T_OVER64PCT,T_DEMOGIDX_2",
						cat: "P_DEM",
						hovertext:
							"Demographic Indicators: Demographic Index - Combination of percent low-income and percent minority",
						category: "P_DEM",
						nationalServiceURL: ejscreenservice, //defined in config.js
						stateServiceURL: ejscreenservice_state,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_DEMOGIDX_5: {
						description: "Supplemental Demographic Index"+acs_update,
						mouseover: "Average of low-income, persons with disabilities, less than high school education, limited English speaking, and low life expectancy",
						legendtitle:
							"Demographic Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Supplemental Demographic Index",
						txtname: "T_DEMOGIDX_5",
						idfldname:
							"T_PEOPCOLORPCT,T_LOWINCPCT,T_LINGISOPCT,T_LESSHSPCT,T_UNDER5PCT,T_OVER64PCT,T_DEMOGIDX_2",
						cat: "P_DEM",
						hovertext:
							"Demographic Indicators: Supplemental Demographic Index - Combination of 5 factors",
						category: "P_DEM",
						nationalServiceURL: ejscreenservice, //defined in config.js
						stateServiceURL: ejscreenservice_state,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_PEOPCOLORPCT: {
						description: "People of Color"+acs_update,
						mouseover: "Individuals who listed their racial status as a race other than white alone and/or list their ethnicity as Hispanic or Latino",
						legendtitle:
							"Demographic Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;People of Color",
						txtname: "T_PEOPCOLORPCT",
						idfldname:
							"T_DEMOGIDX_2,T_LOWINCPCT,T_LINGISOPCT,T_LESSHSPCT,T_UNDER5PCT,T_OVER64PCT,T_PEOPCOLORPCT",
						cat: "P_DEM",
						hovertext:
							"Demographic Indicators: People of Color Population - All people except for Non-Hispanic white as defined by the U.S. Census",
						category: "P_DEM",
						nationalServiceURL: ejscreenservice, //defined in config.js
						stateServiceURL: ejscreenservice_state,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_LOWINCPCT: {
						description: "Low Income"+acs_update,
						mouseover: "Individuals whose household income is less than twice the poverty level",
						legendtitle:
							"Demographic Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Low Income",
						txtname: "T_LOWINCPCT",
						idfldname:
							"T_DEMOGIDX_2,T_PEOPCOLORPCT,T_LINGISOPCT,T_LESSHSPCT,T_UNDER5PCT,T_OVER64PCT,T_LOWINCPCT",
						cat: "P_DEM",
						hovertext:
							"Demographic Indicators: Low Income Population - Individuals whose income is less than two times the poverty level",
						category: "P_DEM",
						nationalServiceURL: ejscreenservice, //defined in config.js
						stateServiceURL: ejscreenservice_state,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					// B_DISABILITYPCT: {
						// description: "Persons with Disabilities",
						// mouseover: "Persons with Disabilities",
						// legendtitle:
							// "Demographic Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Persons with Disabilities",
						// txtname: "T_DISABILITYPCT",
						// idfldname:
							// "T_DEMOGIDX_2,T_PEOPCOLORPCT,T_LOWINCPCT,T_LINGISOPCT,T_LESSHSPCT,T_UNDER5PCT,T_OVER64PCT",
						// cat: "P_DEM",
						// hovertext: "Demographic Indicators: Persons with Disabilities",
						// category: "P_DEM",
						// nationalServiceURL: ejscreenservice, //defined in config.js
						// stateServiceURL: ejscreenservice_state,
						// ejmapindex: ejmapindex,
						// ejmapindex_state: ejmapindex_state,
					// },
					B_UNEMPPCT: {
						description: "Unemployment Rate"+acs_update,
						mouseover: "Individuals who did not have a job during the reporting period",
						legendtitle:
							"Demographic Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Unemployment Rate",
						txtname: "T_UNEMPPCT",
						idfldname:
							"T_DEMOGIDX_2",
						cat: "P_DEM",
						hovertext: "Demographic Indicators: Unemployment Rate",
						category: "P_DEM",
						nationalServiceURL: ejscreenservice, //defined in config.js
						stateServiceURL: ejscreenservice_state,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_LINGISOPCT: {
						description: "Limited English Speaking"+acs_update,
						mouseover: "Percent of households in which no one age 14 and over speaks English 'very well' or speaks English only ",
						legendtitle:
							"Demographic Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Limited English Speaking",
						txtname: "T_LINGISOPCT",
						idfldname:
							"T_DEMOGIDX_2,T_PEOPCOLORPCT,T_LOWINCPCT,T_LESSHSPCT,T_UNDER5PCT,T_OVER64PCT,T_LINGISOPCT",
						cat: "P_DEM",
						hovertext:
							'Demographic Indicators: Limited English Speaking - Households in which no one over age 14 speaks English "very well"',
						category: "P_DEM",
						nationalServiceURL: ejscreenservice, //defined in config.js
						stateServiceURL: ejscreenservice_state,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_LESSHSPCT: {
						description: "Less Than High School Education"+acs_update,
						mouseover: "Individuals age 25 and over with less than high school degree",
						legendtitle:
							"Demographic Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Less Than High School Education",
						txtname: "T_LESSHSPCT",
						idfldname:
							"T_DEMOGIDX_2,T_PEOPCOLORPCT,T_LOWINCPCT,T_LINGISOPCT,T_UNDER5PCT,T_OVER64PCT,T_LESSHSPCT",
						cat: "P_DEM",
						hovertext:
							"Demographic Indicators: Less Than High School Education - Individuals age 25 and over with less than high school degree",
						category: "P_DEM",
						nationalServiceURL: ejscreenservice, //defined in config.js
						stateServiceURL: ejscreenservice_state,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_UNDER5PCT: {
						description: "Under Age 5"+acs_update,
						mouseover: "Percent of individuals under age 5",
						legendtitle:
							"Demographic Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Under Age 5",
						txtname: "T_UNDER5PCT",
						idfldname:
							"T_DEMOGIDX_2,T_PEOPCOLORPCT,T_LOWINCPCT,T_LINGISOPCT,T_LESSHSPCT,T_OVER64PCT,T_UNDER5PCT",
						cat: "P_DEM",
						hovertext: "Demographic Indicators: Population under Age 5",
						category: "P_DEM",
						nationalServiceURL: ejscreenservice, //defined in config.js
						stateServiceURL: ejscreenservice_state,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_OVER64PCT: {
						description: "Over Age 64"+acs_update,
						mouseover: "Percent of individuals over age 64",
						legendtitle:
							"Demographic Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Over Age 64",
						txtname: "T_OVER64PCT",
						idfldname:
							"T_DEMOGIDX_2,T_PEOPCOLORPCT,T_LOWINCPCT,T_LINGISOPCT,T_LESSHSPCT,T_UNDER5PCT,T_OVER64PCT",
						cat: "P_DEM",
						hovertext: "Demographic Indicators: Population over Age 64",
						category: "P_DEM",
						nationalServiceURL: ejscreenservice, //defined in config.js
						stateServiceURL: ejscreenservice_state,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
				},
			},
			P_ENV: {
				description: "Environmental Indicators",
				mouseover: "Environmental Indicators",
				selected: false,
				metalink:
					"https://www.epa.gov/ejscreen/glossary-ejscreen-terms#category-environmental",
				columns: {
					B_PM25: {
						description: 'Particulate Matter 2.5'+env_update ,
						mouseover: "Annual average concentration of particles 2.5 microns or smaller in air",
						legendtitle: "Environmental Data Particular Matter 2.5",
						txtname: "T_PM25",
						idfldname: "T_DEMOGIDX_2,PM25,T_PM25",
						cat: "P_ENV",
						hovertext:
							"Environmental Indicators: Particulate Matter 2.5 - Fine particulate matter levels in the air",
						category: "P_ENV",
						nationalServiceURL: ejscreenservice, //defined in config.js
						stateServiceURL: ejscreenservice_state,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_OZONE: {
						description: "Ozone"+env_update,
						mouseover: "Average of maximum daily ozone concentrations in air",
						legendtitle: "Environmental Data Ozone",
						txtname: "T_OZONE",
						idfldname: "T_DEMOGIDX_2,T_OZONE",
						cat: "P_ENV",
						hovertext:
							"Environmental Indicators: Ozone - Ozone level in the air",
						category: "P_ENV",
						nationalServiceURL: ejscreenservice, //defined in config.js
						stateServiceURL: ejscreenservice_state,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_NO2: {
						description: "Nitrogen Dioxide (NO\u2082)",
						mouseover: "Annual average concentration of NO\u2082 levels in air",
						legendtitle:
							"Environmental Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nitrogen Dioxide (NO\u2082)",
						txtname: "T_NO2",
						idfldname: "T_DEMOGIDX_2,NO2,B_NO2",
						cat: "P_ENV",
						hovertext:
							"Environmental Indicators: Nitrogen Dioxide (NO\u2082)",
						category: "P_ENV",
						nationalServiceURL: ejscreenservice, //defined in config.js
						stateServiceURL: ejscreenservice_state,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_DSLPM: {
						description: "Diesel Particulate Matter",
						mouseover: "Concentration of diesel particulate matter in air",
						legendtitle:
							"Environmental Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Diesel Particulate Matter",
						txtname: "T_DSLPM",
						idfldname: "T_DEMOGIDX_2,T_DSLPM",
						cat: "P_ENV",
						hovertext:
							"Environmental Indicators: Diesel Particulate Matter - Diesel particulate matter level in the air",
						category: "P_ENV",
						nationalServiceURL: ejscreenservice, //defined in config.js
						stateServiceURL: ejscreenservice_state,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_RSEI_AIR: {
						description: "Toxic Releases to Air",
						mouseover: "Average annual chemical concentrations in air weighted by relative toxicity",
						legendtitle:
							"Environmental Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Air Toxics Respiratory HI",
						txtname: "T_RSEI_AIR",
						idfldname: "T_DEMOGIDX_2,T_RSEI_AIR",
						cat: "P_ENV",
						hovertext:
							"Environmental Indicators: Toxic Releases to Air",
						category: "P_ENV",
						nationalServiceURL: ejscreenservice, //defined in config.js
						stateServiceURL: ejscreenservice_state,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_PTRAF: {
						description: "Traffic Proximity",
						mouseover: "Count of vehicles per day at major roads divided by distance",
						legendtitle:
							"Environmental Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Traffic Proximity",
						txtname: "T_PTRAF",
						idfldname: "T_DEMOGIDX_2,T_PTRAF",
						cat: "P_ENV",
						hovertext:
							"Environmental Indicators: Traffic Proximity - Count of vehicles per day at major roads divided by the distance",
						category: "P_ENV",
						nationalServiceURL: ejscreenservice, //defined in config.js
						stateServiceURL: ejscreenservice_state,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_LDPNT: {
						description: "Lead Paint",
						mouseover: "Housing built before 1960, as indicator of potential exposure to lead paint",
						legendtitle:
							"Environmental Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lead Paint",
						txtname: "T_LDPNT",
						idfldname: "T_DEMOGIDX_2,T_LDPNT",
						cat: "P_ENV",
						hovertext:
							"Environmental Indicators: Lead Paint - Percent of housing built before 1960",
						category: "P_ENV",
						nationalServiceURL: ejscreenservice, //defined in config.js
						stateServiceURL: ejscreenservice_state,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_PNPL: {
						description: "Superfund Proximity",
						mouseover: "Count of proposed and listed NPL (National Priorities List) sites divided by distance",
						legendtitle:
							"Environmental Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Superfund Proximity",
						txtname: "T_PNPL",
						idfldname: "T_DEMOGIDX_2,T_PNPL",
						cat: "P_ENV",
						hovertext:
							"Environmental Indicators: Superfund Proximity - Count of National Priorities List/Superfund sites divided by the distance",
						category: "P_ENV",
						nationalServiceURL: ejscreenservice, //defined in config.js
						stateServiceURL: ejscreenservice_state,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_PRMP: {
						description: "RMP Facility Proximity",
						mouseover: "Count of facilities with required Risk Management Plans divided by distance",
						legendtitle:
							"Environmental Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RMP Facility Proximity",
						txtname: "T_PRMP",
						idfldname: "T_DEMOGIDX_2,T_PRMP",
						cat: "P_ENV",
						hovertext:
							"Environmental Indicators: RMP Facility Proximity - Count of facilities with Risk Management Plans divided by the distance",
						category: "P_ENV",
						nationalServiceURL: ejscreenservice, //defined in config.js
						stateServiceURL: ejscreenservice_state,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_PTSDF: {
						description: "Hazardous Waste Proximity",
						mouseover: "Count of TSDFs and LQGs divided by distance",
						legendtitle:
							"Environmental Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hazardous Waste Proximity",
						txtname: "T_PTSDF",
						idfldname: "T_DEMOGIDX_2,T_PTSDF",
						cat: "P_ENV",
						hovertext:
							"Environmental Indicators: Waste Facility Proximity - Count of Transfer, Storage, and Disposal Facilities divided by the distance",
						category: "P_ENV",
						nationalServiceURL: ejscreenservice, //defined in config.js
						stateServiceURL: ejscreenservice_state,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_UST: {
						description: "Underground Storage Tanks",
						mouseover: "Count of Leaking UST and USTs within a buffered block group",
						legendtitle:
							"Environmental Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Underground Storage Tanks",
						txtname: "T_UST",
						idfldname: "T_DEMOGIDX_2,T_UST",
						cat: "P_ENV",
						hovertext:
							"Environmental Indicatores: Underground Storage Tanks - UST facilities/square km",
						category: "P_ENV",
						nationalServiceURL: ejscreenservice, //defined in config.js
						stateServiceURL: ejscreenservice_state,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_PWDIS: {
						description: "Wastewater Discharge"+env_update,
						mouseover: "Average annual chemical concentrations in water weighted by relative toxicity",
						legendtitle:
							"Environmental Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Wastewater Discharge",
						txtname: "T_PWDIS",
						idfldname: "T_DEMOGIDX_2,T_PWDIS",
						cat: "P_ENV",
						hovertext:
							"Environmental Indicators: Wastewater Discharge - Toxicity-weighted concentration/meter distance",
						category: "P_ENV",
						nationalServiceURL: ejscreenservice, //defined in config.js
						stateServiceURL: ejscreenservice_state,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_DWATER: {
						description: "Drinking Water Non-Compliance",
						mouseover: "Number of drinking water violations for community water systems in non-compliance",
						legendtitle:
							"Environmental Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Drinking Water Non-Compliance",
						txtname: "T_DWATER",
						idfldname: "T_DEMOGIDX_2,T_DWATER",
						cat: "P_ENV",
						hovertext:
							"Environmental Indicators: Drinking Water Non-Compliance",
						category: "P_ENV",
						nationalServiceURL: ejscreenservice, //defined in config.js
						stateServiceURL: ejscreenservice_state,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					}
				},
			},
			// "P_MUL": {
			//     "description": "Areas of Concern",
			//     "mouseover": "Areas of Concern",
			//     "selected": false,
			//     "metalink": "https://www.epa.gov/ejscreen/glossary-ejscreen-terms#category-areas-of-concern",
			//     "columns": {
			//         "B_95": {
			//             "description": "Over 95th Percentile",
			//             "legendtitle": "Over 95th Percentile",
			//             "txtname": "T_95",
			//             "idfldname": "EXCEED_COUNT,T_PM25_D2,T_OZONE_D2,T_DSLPM_D2,T_CANCR_D2,T_RESP_D2,T_LDPNT_D2,T_PTRAF_D2,T_PNPL_D2,T_PRMP_D2,T_PTSDF_D2,T_PWDIS_D2,ID,ST_ABBREV",
			//             "cat": "P_MUL",
			//             "hovertext": "Areas where at least one EJ index is at or above the 95th percentile",
			//             "category": "P_MUL"
			//         },
			//         "B_90": {
			//             "description": "Over 90th Percentile",
			//             "legendtitle": "Over 90th Percentile",
			//             "txtname": "T_90",
			//             "idfldname": "EXCEED_COUNT,T_PM25_D2,T_OZONE_D2,T_DSLPM_D2,T_CANCR_D2,T_RESP_D2,T_LDPNT_D2,T_PTRAF_D2,T_PNPL_D2,T_PRMP_D2,T_PTSDF_D2,T_PWDIS_D2,ID,ST_ABBREV",
			//             "cat": "P_MUL",
			//             "hovertext": "Areas where at least one EJ index is at or above the 90th percentile",
			//             "category": "P_MUL"
			//         },
			//         "B_80": {
			//             "description": "Over 80th Percentile",
			//             "legendtitle": "Over 80th Percentile",
			//             "txtname": "T_95",
			//             "idfldname": "EXCEED_COUNT,T_PM25_D2,T_OZONE_D2,T_DSLPM_D2,T_CANCR_D2,T_RESP_D2,T_LDPNT_D2,T_PTRAF_D2,T_PNPL_D2,T_PRMP_D2,T_PTSDF_D2,T_PWDIS_D2,ID,ST_ABBREV",
			//             "cat": "P_MUL",
			//             "hovertext": "Areas where at least one EJ index is at or above the 80th percentile",
			//             "category": "P_MUL"
			//         },
			//         "B_75": {
			//             "description": "Over 75th Percentile",
			//             "legendtitle": "Over 75th Percentile",
			//             "txtname": "T_95",
			//             "idfldname": "EXCEED_COUNT,T_PM25_D2,T_OZONE_D2,T_DSLPM_D2,T_CANCR_D2,T_RESP_D2,T_LDPNT_D2,T_PTRAF_D2,T_PNPL_D2,T_PRMP_D2,T_PTSDF_D2,T_PWDIS_D2,ID,ST_ABBREV",
			//             "cat": "P_MUL",
			//             "hovertext": "Areas where at least one EJ index is at or above the 75th percentile",
			//             "category": "P_MUL"
			//         }
			//     }
			// }
		},
		accordionDiv: "primaryaccord",
	},
	Supplemental: {
		//this is a copy of Primary obj but it is done on purpose to handle future
		//changes
		status: true,
		description: "Supplemental EJ Indexes",
		defaultfield: "B_D5_PM25",
		items: {
			P_EJ5: {
				description: "EJ Indexes",
				mouseover:
					"Combination of a single environmental indicator with the Demographic Index",
				selected: true,
				metalink:
					"https://www.epa.gov/ejscreen/glossary-ejscreen-terms#category-ej-indexes",
				columns: {
					B_D5_PM25: {
						description: "Particulate Matter 2.5"+env_update+acs_update,
						mouseover: "Annual average concentration of particles 2.5 microns or smaller in air",
						legendtitle: "Supplemental Indexes:  Particulate Matter 2.5",
						txtname: "T_D5_PM25",
						idfldname: "T_DEMOGIDX_5,T_D5_PM25",
						cat: "P_EJ2",
						hovertext:
							"Supplemental Indexes: Particulate Matter 2.5 – Fine particulate matter levels in the air",
						category: "P_EJ2",
						nationalServiceURL: ejscreenservice, //defined in config.js file
						stateServiceURL: ejscreenservice,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_D5_OZONE: {
						description: "Ozone"+env_update+acs_update,
						mouseover: "Average of maximum daily ozone concentrations in air",
						legendtitle: "Supplemental Indexes:  Ozone",
						txtname: "T_D5_OZONE",
						idfldname: "T_DEMOGIDX_5,T_D5_OZONE",
						cat: "P_EJ2",
						hovertext: "Supplemental Indexes: Ozone - Ozone level in the air",
						category: "P_EJ2",
						nationalServiceURL: ejscreenservice, //defined in config.js file
						stateServiceURL: ejscreenservice,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},					
					B_D5_NO2: {
						description: "Nitrogen Dioxide (NO\u2082)"+acs_update,
						mouseover: "Annual average concentration of NO\u2082 levels in air",
						legendtitle:
							"Supplemental Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nitrogen Dioxide (NO\u2082)",
						txtname: "T_D5_NO2",
						idfldname: "T_DEMOGIDX_5,D5_NO2,T_D5_NO2",
						cat: "P_EJ2",
						hovertext:
							"Supplemental Indexes: Nitrogen Dioxide (NO\u2082)",
						category: "P_EJ2",
						nationalServiceURL: ejscreenservice, //defined in config.js file
						stateServiceURL: ejscreenservice,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_D5_DSLPM: {
						description: "Diesel Particulate Matter"+acs_update,
						mouseover: "Concentration of diesel particulate matter in air",
						legendtitle:
							"Supplemental Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Diesel Particulate Matter",
						txtname: "T_D5_DSLPM",
						idfldname: "T_DEMOGIDX_5,T_D5_DSLPM",
						cat: "P_EJ2",
						hovertext:
							"Supplemental Indexes: Diesel Particulate Matter - Diesel particulate matter level in the air",
						category: "P_EJ2",
						nationalServiceURL: ejscreenservice, //defined in config.js file
						stateServiceURL: ejscreenservice,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_D5_RSEI_AIR: {
						description: "Toxic Releases to Air"+acs_update,
						mouseover:"Average annual chemical concentrations in air weighted by relative toxicity",
						legendtitle:
							"Supplemental Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Toxic Releases to Air",
						txtname: "T_D5_RSEI_AIR",
						idfldname: "T_DEMOGIDX_5,T_D5_RSEI_AIR",
						cat: "P_EJ5",
						hovertext:
							"Supplemental Indexes: Toxic Releases to Air",
						category: "P_EJ5",
						nationalServiceURL: ejscreenservice, //defined in config.js
						stateServiceURL: ejscreenservice_state,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_D5_PTRAF: {
						description: "Traffic Proximity"+acs_update,
						mouseover: "Count of vehicles per day at major roads divided by distance",
						legendtitle:
							"Supplemental Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Traffic Proximity",
						txtname: "T_D5_PTRAF",
						idfldname: "T_DEMOGIDX_5,T_D5_PTRAF",
						cat: "P_EJ2",
						hovertext:
							"Supplemental Indexes: Traffic Proximity - Count of vehicles per day at major roads divided by the distance",
						category: "P_EJ2",
						nationalServiceURL: ejscreenservice, //defined in config.js file
						stateServiceURL: ejscreenservice,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_D5_LDPNT: {
						description: "Lead Paint"+acs_update,
						mouseover: "Housing built before 1960, as indicator of potential exposure to lead paint",
						legendtitle:
							"Supplemental Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lead Paint",
						txtname: "T_LDPNT_D2",
						idfldname: "T_DEMOGIDX_2,T_LDPNT_D2",
						cat: "P_EJ2",
						hovertext:
							"Supplemental Indexes: Lead Paint - Percent of housing built before 1960",
						category: "P_EJ2",
						nationalServiceURL: ejscreenservice, //defined in config.js file
						stateServiceURL: ejscreenservice,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_D5_PNPL: {
						description: "Superfund Proximity"+acs_update,
						mouseover: "Count of proposed and listed NPL (National Priorities List) sites divided by distance",
						legendtitle:
							"Supplemental Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Superfund Proximity",
						txtname: "T_D5_PNPL",
						idfldname: "T_DEMOGIDX_5,T_D5_PNPL",
						cat: "P_EJ2",
						hovertext:
							"Supplemental Indexes: Superfund Proximity - Count of National Priorities List/Superfund sites divided by the distance",
						category: "P_EJ2",
						nationalServiceURL: ejscreenservice, //defined in config.js file
						stateServiceURL: ejscreenservice,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_D5_PRMP: {
						description: "RMP Facility Proximity"+acs_update,
						mouseover: "Count of facilities with required Risk Management Plans divided by distance",
						legendtitle:
							"Supplemental Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RMP Facility Proximity",
						txtname: "T_D5_PRMP",
						idfldname: "T_DEMOGIDX_5,T_D5_PRMP",
						cat: "P_EJ2",
						hovertext:
							"Supplemental Indexes: RMP Facility Proximity - Count of facilities with Risk Management Plans divided by the distance",
						category: "P_EJ2",
						nationalServiceURL: ejscreenservice, //defined in config.js file
						stateServiceURL: ejscreenservice,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_D5_PTSDF: {
						description: "Hazardous Waste Proximity"+acs_update,
						mouseover: "Count of TSDFs and LQGs divided by distance",
						legendtitle:
							"Supplemental Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hazardous Waste Proximity",
						txtname: "T_D5_PTSDF",
						idfldname: "T_DEMOGIDX_5,T_D5_PTSDF",
						cat: "P_EJ2",
						hovertext:
							"Supplemental Indexes: Waste Facility Proximity - Count of Transfer, Storage, and Disposal Facilities divided by the distance",
						category: "P_EJ2",
						nationalServiceURL: ejscreenservice, //defined in config.js file
						stateServiceURL: ejscreenservice,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_D5_UST: {
						description: "Underground Storage Tanks"+acs_update,
						mouseover: "Count of Leaking UST and USTs within a buffered block group",
						legendtitle:
							"Supplemental Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Underground Storage Tanks",
						txtname: "T_D5_UST",
						idfldname: "T_DEMOGIDX_5,T_D5_UST",
						cat: "P_EJ2",
						hovertext:
							"Supplemental Indexes: Underground Storage Tanks - UST facilities/square km",
						category: "P_EJ2",
						nationalServiceURL: ejscreenservice, //defined in config.js file
						stateServiceURL: ejscreenservice,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					B_D5_PWDIS: {
						description: "Wastewater Discharge"+env_update+acs_update,
						mouseover: "Average annual chemical concentrations in water weighted by relative toxicity",
						legendtitle:
							"Supplemental Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Wastewater Discharge",
						txtname: "T_D5_PWDIS",
						idfldname: "T_DEMOGIDX_2,T_D5_PWDIS",
						cat: "P_EJ2",
						hovertext:
							"Supplemental Indexes: Wastewater Discharge - Toxicity-weighted concentration/meter distance",
						category: "P_EJ2",
						nationalServiceURL: ejscreenservice, //defined in config.js file
						stateServiceURL: ejscreenservice,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},				
					B_D5_DWATER: {
						description: "Drinking Water Non-Compliance"+acs_update,
						mouseover: "Number of drinking water violations for community water systems in non-compliance",
						legendtitle:
							"Supplemental Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Drinking Water Non-Compliance",
						txtname: "T_D5_DWATER",
						idfldname: "T_DEMOGIDX_5,D5_DWATER,T_D5_DWATER",
						cat: "P_EJ2",
						hovertext:
							"Supplemental Indexes: Drinking Water Non-Compliance",
						category: "P_EJ2",
						nationalServiceURL: ejscreenservice, //defined in config.js file
						stateServiceURL: ejscreenservice,
						ejmapindex: ejmapindex,
						ejmapindex_state: ejmapindex_state,
					},
					
				},
			},
		},
		accordionDiv: "primaryaccord",
	},
	Alternatives: {
		status: false,
		description: "Supplementary EJ Indexes",
		defaultfield: "B_PM25_D6",
		items: {
			A_PEJ6: {
				description: "EJ Index with supplementary demographic index",
				metalink:
					"https://www.epa.gov/ejscreen/glossary-ejscreen-terms#category-alt",
				columns: {},
			},
			A1_2: {
				description: "Supplementary EJ Index 1 with demographic index",
				metalink:
					"https://www.epa.gov/ejscreen/glossary-ejscreen-terms#category-alt1",
				columns: {},
			},
			A1_6: {
				description:
					"Supplementary EJ Index 1 with supplementary demographic index",
				metalink:
					"https://www.epa.gov/ejscreen/glossary-ejscreen-terms#category-alt2",
				columns: {},
			},
			A2_2: {
				description: "Supplementary EJ Index 2 with demographic index",
				metalink:
					"https://www.epa.gov/ejscreen/glossary-ejscreen-terms#category-alt3",
				columns: {},
			},
			A2_6: {
				description:
					"Supplementary EJ Index 2 with supplementary demographic index",
				metalink:
					"https://www.epa.gov/ejscreen/glossary-ejscreen-terms#category-alt4",
				columns: {},
			},
		},
		accordionDiv: "altaccord",
	},
};
//end ej title obj

