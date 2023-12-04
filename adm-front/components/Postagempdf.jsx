import React from "react";

export default function Postagempdf(props) {
    const handleGeneratePDFSemPet = () => {
        if (props.gerarS) {
            props.gerarS();
        }
    };

    const handleGeneratePDFComPet = () => {
        if (props.gerarC) {
            props.gerarC();
        }
    };

    return (
        <div>
            <button
                className="btn btn-info"
                type="button"
                onClick={handleGeneratePDFSemPet}
            >
                PDF (Sem pet)
            </button>
            <button 
                className="btn btn-info ms-2"
                type="button"
                onClick={handleGeneratePDFComPet}
            >
                PDF (Com pet)
            </button>
        </div>
    );
}