import { FormStep } from "./FormStep";
import { StepProgress } from "./Progress";
import { simulationFormSteps } from "../../components/data/simulation";

export const SimulationForm = () => {
    const currentStep = simulationFormSteps[0]

    return(
        <>
            <StepProgress currentStep={1} totalSteps={6} />
            <FormStep
                key={currentStep.id}
                {...currentStep}
            />
        </>
    )
}