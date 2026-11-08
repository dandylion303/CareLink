import { StepBase } from "../components/RequestForm/StepBase";
import { StepDettaglio } from "../components/RequestForm/StepDettaglio";
import { StepColf } from "../components/RequestForm/StepColf";
import { StepBabysitter } from "../components/RequestForm/StepBabysitter";
import { StepBadante } from "../components/RequestForm/StepBadante";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Button } from "react-bootstrap";
import { ArrowLeft, ArrowRight } from 'lucide-react'

const URL = import.meta.env.VITE_API_URL

export const NewRequestForm = () => {
    const {
        register,
        handleSubmit,
        trigger,
        watch,
        formState: { errors }
    } = useForm()

    const [step, setStep] = useState(1)

    const goToNextStep = async () => {
        const validStep = await trigger(fieldsInStep[step])
        if (validStep === true) {
            setStep(step + 1)
        }
    }
    const goToPreviousStep = () => {
        setStep(step - 1)
    }

    const onSubmit = (data) => {
        console.log(data)
    }

    const fieldsInStep = {
        1: ['serviceType', 'workRequest'],
        2: ['oreSettimanali', 'durationType', 'startDate', 'endDate', 'workAddress.address', 'workAddress.city', 'workAddress.provincia'],
        3: ['colfDetails.experienceLevel', 'colfDetails.otherStaff', 'colfDetails.specificSkillsNeeded',
            'babySitterDetails.numberOfChildren', 'babySitterDetails.dateOfBirthYoungest', 'babySitterDetails.hasSpecialNeeds',
            'badanteDetails.mainAssistedName','badanteDetails.birthDate','badanteDetails.numberOfAssisted',
            'badanteDetails.selfSufficientLevel', 'badanteDetails.cognitiveState','badanteDetails.mobility',
            
        ],
    }

    const serviceType = watch('serviceType')



    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Nuova Richiesta</h1>

                {/* ================= PAGINA 1 // SCELTA TIPOLOGIA + REGIME ============= */}
                {step === 1 && (
                    <StepBase register={register} errors={errors} watch={watch} />
                )}

                {/* ============== PAGINA 2 // SCELTA ORARI + LUOGO ================= */}
                {step === 2 && (
                    <StepDettaglio register={register} errors={errors} watch={watch} />
                )}

                {/* ================= PAGINA 3 // SCELTA SPECIFICA ============= */}
                {/* ------------- Pag3 - Colf --------- */}

                {step === 3 && (
                    <>
                        {serviceType === 'colf' && (
                            <StepColf register={register} errors={errors} watch={watch} />
                        )}
                    </>
                )}
                {/* ------------- Pag3 - BabySitter --------- */}
                {step === 3 && (
                    <>
                        {serviceType === 'babysitter' && (
                            <StepBabysitter register={register} errors={errors} watch={watch} />
                        )}
                    </>
                )}
                {/* ------------- Pag3 - Badante --------- */}
                {step === 3 && (
                    <>
                        {serviceType === 'badante' && (
                            <StepBadante register={register} errors={errors} watch={watch} />
                        )}
                    </>
                )}

                {/* ================= NAVIGAZIONE ============= */}
                <div className="d-flex justify-content-center align-items-center gap-4">
                    {step > 1 && <Button
                        type='button'
                        aria-label="indietro"
                        onClick={goToPreviousStep}>
                        <ArrowLeft />
                    </Button>}
                    <p className="mb-0">Passo {step} di 4</p>
                    {(step < 4) && <Button
                        type='button'
                        aria-label="avanti"
                        onClick={goToNextStep}>
                        <ArrowRight />
                    </Button>}
                </div>
            </form>
        </Container>
    )
}


