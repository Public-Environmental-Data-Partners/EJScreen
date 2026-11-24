//layerJson, maps txtname to field name in ej index layer to draw on map
var layerJson = {
	B_D2_PM25: {
		description: "Particulate Matter 2.5",
		legendtitle: "EJ Index  Particulate Matter 2.5",
		txtname: "T_D2_PM25",
		idfldname: "T_DEMOGIDX_2,PM25, T_D2_PM25",
		cat: "P_EJ2",
		hovertext:
			"EJ Indexes: Particulate Matter 2.5 – Annual average concentration of particles 2.5 microns or smaller in air",
		category: "P_EJ2",
		metalink: glossaryurlEJIndexes + "#particulate",
	},
	
	B_D2_OZONE: {
		description: "Ozone",
		legendtitle: "EJ Index  Ozone",
		txtname: "T_OZONE_D2",
		idfldname: "T_DEMOGIDX_2,T_D2_OZONE",
		cat: "P_EJ2",
		hovertext: "EJ Indexes: Ozone - Average of maximum daily ozone concentrations in air",
		category: "P_EJ2",
		metalink: glossaryurlEJIndexes + "#ozone"
	},
	B_D2_NO2: {
		description: "Nitrogen Dioxide (NO\u2082)",
		legendtitle:
			"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nitrogen Dioxide (NO\u2082)",
		txtname: "T_D2_NO2",
		idfldname: "T_DEMOGIDX_2,D2_NO2, T_D2_NO2",
		cat: "P_EJ2",
		hovertext:
			"EJ Indexes: Annual average concentration of NO\u2082 levels in air",
		category: "P_EJ2",
		metalink: glossaryurlEJIndexes + "#nitrogen",
	},
	B_D2_DSLPM: {
		description: "Diesel Particulate Matter",
		legendtitle:
			"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Diesel Particulate Matter",
		txtname: "T_D2_DSLPM",
		idfldname: "T_DEMOGIDX_2,T_D2_DSLPM",
		cat: "P_EJ2",
		hovertext:
			"EJ Indexes: Diesel Particulate Matter - Concentration of diesel particulate matter in air",
		category: "P_EJ2",
		metalink: glossaryurlEJIndexes + "#diesel",
	},
	B_D2_RSEI_AIR: {
		description: "Toxic Releases to Air",
		legendtitle: "EJ Index Toxic Releases to Air",
		txtname: "T_D2_RSEI_AIR",
		idfldname: "T_DEMOGIDX_2,T_D2_RSEI_AIR",
		cat: "P_EJ2",
		hovertext:
			"EJ Indexes: Average annual chemical concentrations in air weighted by relative toxicity",
		category: "P_EJ2",
		metalink: glossaryurlEJIndexes + "#toxic"
	},
	B_D2_PTRAF: {
		description: "Traffic Proximity",
		legendtitle:
			"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Traffic Proximity",
		txtname: "T_D2_PTRAF",
		idfldname: "T_DEMOGIDX_2,T_D2_PTRAF",
		cat: "P_EJ2",
		hovertext:
			"EJ Indexes: Traffic Proximity -Count of vehicles per day at major roads divided by distance",
		category: "P_EJ2",
		metalink: glossaryurlEJIndexes + "#traffic"
	},
	B_D2_LDPNT: {
		description: "Lead Paint",
		legendtitle:
			"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lead Paint",
		txtname: "T_D2_LDPNT",
		idfldname: "T_DEMOGIDX_2,T_D2_LDPNT",
		cat: "P_EJ2",
		hovertext: "EJ Indexes: Lead Paint - Housing built before 1960, as indicator of potential exposure to lead paint",
		category: "P_EJ2",
		metalink: glossaryurlEJIndexes + "#lead"
	},
	B_D2_PNPL: {
		description: "Superfund Proximity",
		legendtitle:
			"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Superfund Proximity",
		txtname: "T_D2_PNPL",
		idfldname: "T_DEMOGIDX_2,T_D2_PNPL",
		cat: "P_EJ2",
		hovertext:
			"EJ Indexes: Superfund Proximity - Count of proposed and listed NPL (National Priorities List) sites divided by distance",
		category: "P_EJ2",
		metalink: glossaryurlEJIndexes + "#superfund"
	},
	B_D2_PRMP: {
		description: "RMP Facility Proximity",
		legendtitle:
			"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RMP Facility Proximity",
		txtname: "T_D2_PRMP",
		idfldname: "T_DEMOGIDX_2,T_D2_PRMP",
		cat: "P_EJ2",
		hovertext:
			"EJ Indexes: RMP Facility Proximity - Count of facilities with required Risk Management Plans divided by distance",
		category: "P_EJ2",
		metalink: glossaryurlEJIndexes + "#risk"
	},
	B_D2_PTSDF: {
		description: "Hazardous Waste Proximity",
		legendtitle:
			"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hazardous Waste Proximity",
		txtname: "T_D2_PTSDF",
		idfldname: "T_DEMOGIDX_2,T_D2_PTSDF",
		cat: "P_EJ2",
		hovertext:
			"EJ Indexes: Waste Facility Proximity - Count of TSDFs and LQGs divided by distance",
		category: "P_EJ2",
		metalink: glossaryurlEJIndexes + "#hazardous"
	},
	B_D2_UST: {
		description: "Underground Storage Tanks",
		legendtitle:
			"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Underground Storage Tanks",
		txtname: "T_D2_UST",
		idfldname: "T_DEMOGIDX_2,T_D2_UST",
		cat: "P_EJ2",
		hovertext:
			"EJ Indexes: Underground Storage Tanks - Count of Leaking UST and USTs within a buffered block group",
		category: "P_EJ2",
		metalink: glossaryurlEJIndexes + "#underground"
	},
	B_D2_PWDIS: {
		description: "Wastewater Discharge",
		legendtitle:
			"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Wastewater Discharge",
		txtname: "T_D2_PWDIS",
		idfldname: "T_DEMOGIDX_2,T_D2_PWDIS",
		cat: "P_EJ2",
		hovertext:
			"EJ Indexes: Average annual chemical concentrations in water weighted by relative toxicity",
		category: "P_EJ2",
		metalink: glossaryurlEJIndexes + "#wastewater"
	},	
	B_D2_DWATER: {
		description: "Drinking Water Non-Compliance",
		legendtitle:
			"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Drinking Water Non-Compliance",
		txtname: "T_D2_DWATER",
		idfldname: "T_DEMOGIDX_2,D2_DWATER,T_D2_DWATER",
		cat: "P_EJ2",
		hovertext:
			"EJ Indexes: Number of drinking water violations for community water systems in non-compliance",
		category: "P_EJ2",
		metalink: glossaryurlEJIndexes + "#drinking"
	},
	B_D5_PM25: {
		description: "Particulate Matter 2.5",
		legendtitle: "Supplemental Particulate Matter 2.5",
		txtname: "T_D5_PM25",
		idfldname: "T_DEMOGIDX_5,T_D5_PM25",
		cat: "P_EJ5",
		hovertext:
			"Supplemental Indexes: Particulate Matter 2.5 – Annual average concentration of particles 2.5 microns or smaller in air",
		category: "P_EJ5",
		metalink: glossaryurlSuppIndexes + "#particulate"
	},
	B_D5_OZONE: {
		description: "Ozone",
		legendtitle: "Supplemental Index  Ozone",
		txtname: "T_OZONE_D2",
		idfldname: "T_DEMOGIDX_5,T_D5_OZONE",
		cat: "P_EJ5",
		hovertext: "Supplemental Indexes: Ozone - Ozone level in the air",
		category: "P_EJ5",
		metalink: glossaryurlSuppIndexes + "#ozone"
	},	
	B_D5_NO2: {
		description: "Nitrogen Dioxide (NO\u2082)",
		legendtitle:
			"Supplemental Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Nitrogen Dioxide (NO\u2082)",
		txtname: "T_D5_NO2",
		idfldname: "T_DEMOGIDX_5,D5_NO2,T_D5_NO2",
		cat: "P_EJ5",
		hovertext:
			"EJ Indexes: Nitrogen Dioxide (NO\u2082)",
		category: "P_EJ5",
		metalink: glossaryurlSuppIndexes + "#nitrogen"
	},
	B_D5_DSLPM: {
		description: "Diesel Particulate Matter",
		legendtitle:
			"Supplemental Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Diesel Particulate Matter",
		txtname: "T_D5_DSLPM",
		idfldname: "T_DEMOGIDX_5,T_D5_DSLPM",
		cat: "P_EJ5",
		hovertext:
			"Supplemental Indexes: Diesel Particulate Matter - Diesel particulate matter level in the air",
		category: "P_EJ5",
		metalink: glossaryurlSuppIndexes + "#diesel"
	},
	B_D5_RSEI_AIR : {
		description: "Toxic Releases to Air",
		legendtitle:
			"Supplemental Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Toxic Releases to Air",
		txtname: "T_D5_RSEI_AIR",
		idfldname: "T_DEMOGIDX_5,T_D5_RSEI_AIR",
		cat: "P_EJ5",
		hovertext:
			"EJ Indexes: Toxic Releases to Air",
		category: "P_EJ5",
		metalink: glossaryurlSuppIndexes + "#toxic"
	},
	B_D5_PTRAF: {
		description: "Traffic Proximity",
		legendtitle:
			"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Traffic Proximity",
		txtname: "T_D5_PTRAF",
		idfldname: "T_DEMOGIDX_5,T_D5_PTRAF",
		cat: "P_EJ5",
		hovertext:
			"Supplemental Indexes: Traffic Proximity - Count of vehicles per day at major roads divided by the distance",
		category: "P_EJ5",
		metalink: glossaryurlSuppIndexes + "#traffic"
	},
	B_D5_LDPNT: {
		description: "Lead Paint",
		legendtitle:
			"Supplemental Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lead Paint",
		txtname: "T_D5_LDPNT",
		idfldname: "T_DEMOGIDX_5,T_D5_LDPNT",
		cat: "P_EJ5",
		hovertext: "Supplemental Indexes: Lead Paint - Percent of housing built before 1960",
		category: "P_EJ5",
		metalink: glossaryurlSuppIndexes + "#lead"
	},
	B_D5_PNPL: {
		description: "Superfund Proximity",
		legendtitle:
			"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Superfund Proximity",
		txtname: "T_D5_PNPL",
		idfldname: "T_DEMOGIDX_5,T_D5_PNPL",
		cat: "P_EJ5",
		hovertext:
			"Supplemental Indexes: Superfund Proximity - Count of National Priorities List/Superfund sites divided by the distance",
		category: "P_EJ5",
		metalink: glossaryurlSuppIndexes + "#superfund"
	},
	B_D5_PRMP: {
		description: "RMP Facility Proximity",
		legendtitle:
			"Supplemental Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RMP Facility Proximity",
		txtname: "T_D5_PRMP",
		idfldname: "T_DEMOGIDX_5,T_D5_PRMP",
		cat: "P_EJ5",
		hovertext:
			"Supplemental Indexes: RMP Facility Proximity - Count of facilities with Risk Management Plans divided by the distance",
		category: "P_EJ5",
		metalink: glossaryurlSuppIndexes + "#risk"
	},
	B_D5_PTSDF: {
		description: "Hazardous Waste Proximity",
		legendtitle:
			"EJ Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hazardous Waste Proximity",
		txtname: "T_D5_PTSDF",
		idfldname: "T_DEMOGIDX_5,T_D5_PTSDF",
		cat: "P_EJ5",
		hovertext:
			"Supplemental Indexes: Waste Facility Proximity - Count of Transfer, Storage, and Disposal Facilities divided by the distance",
		category: "P_EJ5",
		metalink: glossaryurlSuppIndexes + "#hazardous"
	},
	B_D5_UST: {
		description: "Underground Storage Tanks",
		legendtitle:
			"Supplemental Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Underground Storage Tanks",
		txtname: "T_D5_UST",
		idfldname: "T_DEMOGIDX_5,T_D5_UST",
		cat: "P_EJ5",
		hovertext:
			"EJ Indexes: Underground Storage Tanks - UST facilities/square km",
		category: "P_EJ5",
		metalink: glossaryurlSuppIndexes + "#underground"
	},
	B_D5_PWDIS: {
		description: "Wastewater Discharge",
		legendtitle:
			"Supplemental Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Wastewater Discharge",
		txtname: "T_D2_PWDIS",
		idfldname: "T_DEMOGIDX_5,T_D5_PWDIS",
		cat: "P_EJ5",
		hovertext:
			"Supplemental Indexes: Wastewater Discharge - Toxicity-weighted concentration/meter distance",
		category: "P_EJ5",
		metalink: glossaryurlSuppIndexes + "#wastewater"
	},	
	B_D5_DWATER: {
		description: "Drinking Water Non-Compliance",
		legendtitle:
			"Supplemental Index<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Drinking Water Non-Compliance",
		txtname: "T_D5_DWATER",
		idfldname: "T_DEMOGIDX_5,D5_DWATER,T_D5_DWATER",
		cat: "P_EJ5",
		hovertext:
			"EJ Indexes: Drinking Water Non-Compliance",
		category: "P_EJ5",
		metalink: glossaryurlSuppIndexes + "#drinking"
	},
	B_PM25: {
		description: "Particulate Matter 2.5",
		legendtitle: "Environmental Data Particulate Matter 2.5",
		txtname: "T_PM25", // not actually used??
		idfldname: "DEMOGIDX_2,PM25, P_PM25",
		cat: "P_ENV",
		hovertext:
			"Environmental Indicators: Particulate Matter 2.5 - Fine particulate matter levels in the air",
		category: "P_ENV",
		metalink: glossaryurl + "#particulate"
	},
	B_OZONE: {
		description: "Ozone",
		legendtitle: "Environmental Data Ozone",
		txtname: "T_OZONE",
		idfldname: "T_DEMOGIDX_2,T_OZONE",
		cat: "P_ENV",
		hovertext: "Environmental Indicators: Ozone - Ozone level in the air",
		category: "P_ENV",
		metalink: glossaryurl + "#ozone"
	},
	B_DSLPM: {
		description: "Diesel Particulate Matter",
		legendtitle:
			"Environmental Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Diesel Particulate Matter",
		txtname: "T_DSLPM",
		idfldname: "T_DEMOGIDX_2,T_DSLPM",
		cat: "P_ENV",
		hovertext:
			"Environmental Indicators: Diesel Particulate Matter - Diesel particulate matter level in the air",
		category: "P_ENV",
		metalink: glossaryurl + "#diesel"
		
	},
	B_NO2: {
		description: "Nitrogen Dioxide (NO\u2082)",
		legendtitle:
			"Environmental Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Air Toxics Cancer Risk",
		txtname: "T_NO2",
		idfldname: "T_DEMOGIDX_2,T_NO2",
		cat: "P_ENV",
		hovertext:
			"Environmental Indicators: Nitrogen Dioxide (NO\u2082)",
		category: "P_ENV",
		metalink: glossaryurl + "#nitrogen"
	},
	B_RSEI_AIR: {
		description: "Toxic Releases to Air",
		legendtitle:
			"Environmental Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Air Toxics Respiratory HI",
		txtname: "T_RSEI_AIR",
		idfldname: "T_DEMOGIDX_2,T_RSEI_AIR",
		cat: "P_ENV",
		hovertext:
			"Environmental Indicators: Toxic Releases to Air",
		category: "P_ENV",
		metalink: glossaryurl + "#toxic"
	},
	B_PTRAF: {
		description: "Traffic Proximity",
		legendtitle:
			"Environmental Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Traffic Proximity",
		txtname: "T_PTRAF",
		idfldname: "T_DEMOGIDX_2,T_PTRAF",
		cat: "P_ENV",
		hovertext:
			"Environmental Indicators: Traffic Proximity - Count of vehicles per day at major roads divided by the distance",
		category: "P_ENV",
		metalink: glossaryurl + "#traffic"
	},
	B_LDPNT: {
		description: "Lead Paint",
		legendtitle:
			"Environmental Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lead Paint",
		txtname: "T_LDPNT",
		idfldname: "T_DEMOGIDX_2,T_LDPNT",
		cat: "P_ENV",
		hovertext:
			"Environmental Indicators: Lead Paint - Percent of housing built before 1960",
		category: "P_ENV",
		metalink: glossaryurl + "#lead"
	},
	B_PNPL: {
		description: "Superfund Proximity",
		legendtitle:
			"Environmental Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Superfund Proximity",
		txtname: "T_PNPL",
		idfldname: "T_DEMOGIDX_2,T_PNPL",
		cat: "P_ENV",
		hovertext:
			"Environmental Indicators: Superfund Proximity - Count of National Priorities List/Superfund sites divided by the distance",
		category: "P_ENV",
		metalink: glossaryurl + "#superfund"
	},
	B_PRMP: {
		description: "RMP Facility Proximity",
		legendtitle:
			"Environmental Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RMP Facility Proximity",
		txtname: "T_PRMP",
		idfldname: "T_DEMOGIDX_2,T_PRMP",
		cat: "P_ENV",
		hovertext:
			"Environmental Indicators: RMP Facility Proximity - Count of facilities with Risk Management Plans divided by the distance",
		category: "P_ENV",
		metalink: glossaryurl + "#risk"
	},
	B_PTSDF: {
		description: "Hazardous Waste Proximity",
		legendtitle:
			"Environmental Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hazardous Waste Proximity",
		txtname: "T_PTSDF",
		idfldname: "T_DEMOGIDX_2,T_PTSDF",
		cat: "P_ENV",
		hovertext:
			"Environmental Indicators: Waste Facility Proximity - Count of Transfer, Storage, and Disposal Facilities divided by the distance",
		category: "P_ENV",
		metalink: glossaryurl + "#hazardous"
	},
	B_UST: {
		description: "Underground Storage Tanks",
		legendtitle:
			"Environmental Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Underground Storage Tanks",
		txtname: "T_UST",
		idfldname: "T_DEMOGIDX_2,T_PWDIS",
		cat: "P_ENV",
		hovertext:
			"Environmental Indicatores: Underground Storage Tanks - UST facilities/square km",
		category: "P_ENV",
		metalink: glossaryurl + "#underground"
	},
	B_PWDIS: {
		description: "Wastewater Discharge",
		legendtitle:
			"Environmental Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Wastewater Discharge",
		txtname: "T_PWDIS",
		idfldname: "T_DEMOGIDX_2,T_PWDIS",
		cat: "P_ENV",
		hovertext:
			"Environmental Indicators: Wastewater Discharge - Toxicity-weighted concentration/meter distance",
		category: "P_ENV",
		metalink: glossaryurl + "#wastewater"
	},

	B_DEMOGIDX_2: {
		description: "Demographic Index",
		legendtitle:
			"Demographic Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Demographic Index",
		txtname: "T_DEMOGIDX_2",
		idfldname:
			"T_PEOPCOLORPCT,T_LOWINCPCT,T_LINGISOPCT,T_LESSHSPCT,T_UNDER5PCT,T_OVER64PCT,T_DEMOGIDX_2",
		cat: "P_DEM",
		hovertext:
			"Demographic Indicators: Demographic Index - Combination of percent low-income and percent minority",
		category: "P_DEM",
		metalink: glossaryurl + "#demographic"
		
	},
	B_DEMOGIDX_5: {
		description: "Supplemental Demographic Index",
		legendtitle:
			"Demographic Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Supplemental Demographic Index",
		txtname: "T_DEMOGIDX_5",
		idfldname:
			"T_PEOPCOLORPCT,T_LOWINCPCT,T_LINGISOPCT,T_LESSHSPCT,T_UNDER5PCT,T_OVER64PCT,T_DEMOGIDX_2",
		cat: "P_DEM",
		hovertext:
			"Demographic Indicators: Demographic Index - Combination of 5 factors",
		category: "P_DEM",
		metalink: glossaryurl + "#sdi"
	},
	B_PEOPCOLORPCT: {
		description: "People of Color",
		legendtitle:
			"Demographic Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;People of Color",
		txtname: "T_PEOPCOLORPCT",
		idfldname:
			"T_DEMOGIDX_2,T_LOWINCPCT,T_LINGISOPCT,T_LESSHSPCT,T_UNDER5PCT,T_OVER64PCT,T_PEOPCOLORPCT",
		cat: "P_DEM",
		hovertext:
			"Demographic Indicators: People of Color - All people except for Non-Hispanic white as defined by the U.S. Census",
		category: "P_DEM",
		metalink: glossaryurl + "#poc"
	},
	B_LOWINCPCT: {
		description: "Low Income",
		legendtitle:
			"Demographic Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Low Income",
		txtname: "T_LOWINCPCT",
		idfldname:
			"T_DEMOGIDX_2,T_PEOPCOLORPCT,T_LINGISOPCT,T_LESSHSPCT,T_UNDER5PCT,T_OVER64PCT,T_LOWINCPCT",
		cat: "P_DEM",
		hovertext:
			"Demographic Indicators: Low Income - Individuals whose income is less than two times the poverty level",
		category: "P_DEM",
		metalink: glossaryurl + "#lowincome"
	},
	B_LINGISOPCT: {
		description: "Limited English Speaking",
		legendtitle:
			"Demographic Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Limited English Speaking",
		txtname: "T_LINGISOPCT",
		idfldname:
			"T_DEMOGIDX_2,T_PEOPCOLORPCT,T_LOWINCPCT,T_LESSHSPCT,T_UNDER5PCT,T_OVER64PCT,T_LINGISOPCT",
		cat: "P_DEM",
		hovertext:
			'Demographic Indicators: Limited English Speaking - Households in which no one over age 14 speaks English "very well"',
		category: "P_DEM",
		metalink: glossaryurl + "#les"
	},
	B_LESSHSPCT: {
		description: "Less Than High School Education",
		legendtitle:
			"Demographic Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Less Than High School Education",
		txtname: "T_LESSHSPCT",
		idfldname:
			"T_DEMOGIDX_2,T_PEOPCOLORPCT,T_LOWINCPCT,T_LINGISOPCT,T_UNDER5PCT,T_OVER64PCT,T_LESSHSPCT",
		cat: "P_DEM",
		hovertext:
			"Demographic Indicators: Less Than High School Education - Individuals age 25 and over with less than high school degree",
		category: "P_DEM",
		metalink: glossaryurl + "#hs"
	},
	B_UNDER5PCT: {
		description: "Under Age 5",
		legendtitle:
			"Demographic Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Under Age 5",
		txtname: "T_UNDER5PCT",
		idfldname:
			"T_DEMOGIDX_2,T_PEOPCOLORPCT,T_LOWINCPCT,T_LINGISOPCT,T_LESSHSPCT,T_OVER64PCT,T_UNDER5PCT",
		cat: "P_DEM",
		hovertext: "Demographic Indicators: Population under Age 5",
		category: "P_DEM",
		metalink: glossaryurl + "#under5"
	},
	B_OVER64PCT: {
		description: "Over Age 64",
		legendtitle:
			"Demographic Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Over Age 64",
		txtname: "T_OVER64PCT",
		idfldname:
			"T_DEMOGIDX_2,T_PEOPCOLORPCT,T_LOWINCPCT,T_LINGISOPCT,T_LESSHSPCT,T_UNDER5PCT,T_OVER64PCT",
		cat: "P_DEM",
		hovertext: "Demographic Indicators: Population over Age 64",
		category: "P_DEM",
		metalink: glossaryurl + "#over64"
	},
	B_DISABILITYPCT: {
		description: "Persons with Disabilities",
		legendtitle:
			"Demographic Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Persons with Disabilities",
		txtname: "T_DISABILITYPCT",
		idfldname:
			"T_DEMOGIDX_2,T_PEOPCOLORPCT,T_LOWINCPCT,T_LINGISOPCT,T_LESSHSPCT,T_UNDER5PCT,T_OVER64PCT",
		cat: "P_DEM",
		hovertext: "Demographic Indicators: Persons with Disabilities",
		category: "P_DEM",
		//metalink: glossaryurl + "#over64"
	},	
	B_UNEMPPCT: {
		description: "Unemployment Rate",
		legendtitle:
			"Demographic Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Unemployment Rate",
		txtname: "T_UNEMPPCT",
		idfldname:
			"T_DEMOGIDX_2,T_PEOPCOLORPCT,T_LOWINCPCT,T_LINGISOPCT,T_LESSHSPCT,T_UNDER5PCT,T_OVER64PCT",
		cat: "P_DEM",
		hovertext: "Demographic Indicators: Unemployment Rate",
		category: "P_DEM",
		metalink: glossaryurl + "#unemployment"
	},	
	B_DWATER: {
		description: "Drinking Water Non-Compliance",
		legendtitle:
			"Environmental Data<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Drinking Water Non-Compliance",
		txtname: "T_DWATER",
		idfldname: "T_DEMOGIDX_2,T_DWATER",
		cat: "P_ENV",
		hovertext:
			"Environmental Indicators: Drinking Water Non-Compliance",
		category: "P_ENV",
		metalink: glossaryurl + "#drinking"
	},
};
//end layerjson obj



