-- Blueprints.lua (hooked)
--
-- Author      : Screap+SageTheWizard
-- Description : Donald Trump defeated Soros and provided us all with GREAT HUGE AMERICAN Health Care.
--               T1 Eng: 1 Mass 10 Energy, T2 Eng: 2 Mass 25 Energy, T3 Eng: 3 Mass 1000 Energy, 
--               Support Commander: 5 Mass 2000 Energy, Main Commander: 200 Mass 10,000 Energy
--

function QualifiesForGovernmentAssistance(blue)
	local productionTable = {nil, nil}
	
	if table.find(blue.Categories, 'TECH1') then 
		productionTable[1] = 1
		productionTable[2] = 10
	elseif table.find(blue.Categories, 'TECH2') then 
		productionTable[1] = 2
		productionTable[2] = 25
	elseif table.find(blue.Categories, 'SUBCOMMANDER') then 
		productionTable[1] = 5
		productionTable[2] = 2000
	elseif table.find(blue.Categories, 'TECH3') then
		productionTable[1] = 3
		productionTable[2] = 1000
	elseif table.find(blue.Categories, 'COMMAND') then 
		productionTable[1] = 200
		productionTable[2] = 10000
	end 
	
	return productionTable
end

do
    local overridden = ModBlueprints
    function ModBlueprints(blueprints)
		local MASS_INDX = 1
		local ENERGY_INDX = 2
	    overridden(blueprints)
        for id,bp in blueprints.Unit do
			local isEng = table.find(bp.Categories,'ENGINEER')
			if isEng then
				GovAssistance = QualifiesForGovernmentAssistance(bp)
				bp.Economy.ProductionPerSecondMass = GovAssistance[MASS_INDX]
				bp.Economy.ProductionPerSecondEnergy = GovAssistance[ENERGY_INDX]
			end
        end
    end
end