import { type SimulationFormData } from "../components/data/simulation";

const LOCAL_STORAGE_KEY = 'simulatio-data'

export const useSimulationStorage = () => {
    const saveFormData = (formData: SimulationFormData) => {
        const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
        const savedData = storage
            ? (JSON.parse(storage) as SimulationFormData[])
            : []
        
        localStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify([...savedData, formData])
        )
    }

    return { saveFormData }
}