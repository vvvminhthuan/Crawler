import React, {useEffect, useState} from 'react'
import config from 'config'

type initProps = {
    title: string,
    classBody?: string,
    initStep: Array<string> // ['step 1', 'step 2', 'step 3']
    initFooter: {
        step1: string,
        actionStep1: Function,
        step2: string,
        actionStep2: Function,
        turnBack: string,
        complete: React.ReactNode
    }
}

const FormStep : React.FC<initProps> = ({children, title, initFooter, initStep, classBody}) =>{
    const [step, setStep] = useState(1)
    const [isNext, setIsNext] = useState(false)

    const onStep1 = () =>{
        let isNext = initFooter.actionStep1()
        if (isNext) {
            setStep(step + 1)
            setIsNext(true)
        }else{
            setIsNext(false)
        }
    }

    const onStep2 = () =>{
        initFooter.actionStep2()
        if (isNext) {
            setStep(step + 1)
        }
    }

    const onBack = () =>{
        if (step>1) {
            setStep(step - 1)
        }
    }
    const setHeaderStep = () => {
        let element = []
        initStep.forEach((e, i) => {
            element.push(<div key={i+1} className={`step ${(step==(i+1)) ? 'active' : ''}`}>
                <button className="step-trigger">
                    <span className="step-circle">{i+1}</span>
                    <span className="step-label">{e}</span>
                </button>
            </div>)
            if (i < initStep.length-1) {
                element.push(<div key={initStep.length + i + 1} className="step-line"></div>)
            }
        })
        return element
    }

    return (
        <div className={`form-step-page ${classBody}`}>
            <div className="card-form-step">
                {/* /.card-header */}
                <div className="card-header">
                    <h3 className="card-title">{title}</h3>
                </div>
                {/* /.card-header */}
                {/* /.stepper-header */}
                <div className="stepper-header flex-r">
                    {setHeaderStep()}
                </div>
                {/* /.stepper-header */}
                {/* form start */}
                <div className="form">
                    <div className={`card-body ${step > 1 ? 'control-disable': ''}`}>
                        {/* step sign up */}
                        <div className={`step step-signup ${step > 2 ? 'hidden' : ''}`}>
                            {children}    
                            <div className={`form-action flex-r ${step != 1 ? 'hidden' : ''}`}>
                                <button onClick={onStep1}>{initFooter.step1}</button>
                            </div>
                            {/* step confirm */}
                            <div className={`form-action flex-r ${step != 2 ? 'hidden' : ''}`}>
                                <div className="group">
                                    <button className="btn-privice" onClick={onBack}>{initFooter.turnBack}</button>
                                    <button onClick={onStep2}>{initFooter.step2}</button>
                                </div>
                            </div>                   
                        </div>
                        {/* step complete */}
                        <div id="complete" className={`step step-complete ${step != 3 ? 'hidden' : ''}`} >
                            {initFooter.complete}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormStep