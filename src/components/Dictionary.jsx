import React, { useEffect, useState } from 'react';

const Dictionary = ({ word }) => {
    word = word.trim()
    const [mean, setMean] = useState("");
    const [definitions, setDefinitions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [audio, setAudio] = useState("")
    const [text, setText] = useState("")
    // const [Synonym, setSynonym] = useState([])
    const [meanings, setMeanings] = useState([])
    const [phonetics, setPhonetics] = useState([])
    const [err, setErr] = useState(false)

    const analyseAPI = (data) => {
        // console.log("API analysys : ", data)
        setMeanings(data["meanings"]);
        // data["phonetics"].forEach((e) => {
        //     if (text == "" && e["text"] != "") {
        //         setText(e["text"]);
        //     }
        //     if (audio === "" && e["audio"] != "") {
        //         setAudio(e["audio"]);
        //     }
        //     // if (audio != "" && text != "") {
        //     // }
        // })

        // data["meanings"].forEach((mean, index) => {
        //     console.log(mean, index)
        // });
    }
    const analyseApi2 = (data) => {
        // setText("")
        setPhonetics(data)
        setAudio("")
        setText("");
        data.forEach((e) => {
            if (text == "" && e["text"] != "") {
                setText(e["text"]);
                // console.log(e["text"])
            }
            if (audio === "" && e["audio"] != "") {
                setAudio(e["audio"]);
                // console.log(e[["audio"]])
            }
            if (audio != "" && text != "") {
                return;
            }
        })
    }

    const removeData = () => {
        setErr(true)
        setAudio("")
        setMean("")
        setMeanings([])
        setText("")
    }




    useEffect(() => {
        if (word.trim() !== "") {
            setLoading(true);
            setMean("")
            setText("")
            setAudio("")
            setDefinitions([])
            // const encoded = encodeURI(word);

            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURI(word)}`)
                .then((res) => res.json())
                .then((data) => {
                    const meanings = data[0]?.meanings;
                    if (meanings && meanings.length > 0) {
                        const firstMeaning = meanings[0];
                        const firstDefinition = firstMeaning?.definitions[0]?.definition;
                        setMean(firstDefinition);
                        setDefinitions(firstMeaning?.definitions.map(def => def.definition));
                        analyseAPI(data[0])
                        analyseApi2(data[0]["phonetics"])
                        setErr(false)
                    } else {
                        setLoading(false);
                        removeData()
                        // alert("Please check your word & try again...")
                    }
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                    removeData()
                    alert("Technical issue occurred! Please try after some time")
                });
        }
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts
    useEffect(() => {
        if (word.trim() !== "") {
            setLoading(true); // Set loading state to true before making the API call
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
                .then((res) => res.json())
                .then((data) => {
                    const meanings = data[0]?.meanings;
                    if (meanings && meanings.length > 0) {
                        const firstMeaning = meanings[0];
                        const firstDefinition = firstMeaning?.definitions[0]?.definition;
                        setMean(firstDefinition);
                        setDefinitions(firstMeaning?.definitions.map(def => def.definition));
                        analyseAPI(data[0])
                        analyseApi2(data[0]["phonetics"])
                        setErr(false)
                    } else {
                        setLoading(false); // Set loading state to false if no meanings are found
                        removeData()
                    }
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                    removeData()
                    alert("Technical issue occurred! Please try after some time")
                });
        }
    }, [word]);

    return (
        <div className='dictRoot'>
            {//word.trim() === "" && <div>Word is not provided.</div>
            }
            {text && mean && word.trim() != "" && text != "" && <div>The word is: <b>: {text}</b> </div>}{(word.toLowerCase() == "love" || word.toLowerCase() == "like" || word.toLowerCase() == "amit" || word.toLowerCase() == "promathi" || word.startsWith("prov")) && <span className='text-5xl inline'>❤️💘💕</span>}
            {
                audio && mean && word.trim() != "" && audio != "" && <div>
                    <audio className='p-[0.5rem] px-24 drop-shadow-xl m-auto sm:px-12 ' controls src={audio}></audio>
                </div>

            }
            {

                phonetics.map((a) => {
                    // a.forEach((ab) => {
                    if (text == "" && a["text"] != "") {
                        setText(a["text"]);
                        // console.log(a["text"])
                    }
                    if (audio === "" && a["audio"] != "") {
                        setAudio(a["audio"]);
                        // console.log(a[["audio"]])
                    }
                    // })
                })

            }
            <div>
                {
                    mean && word.trim() != "" && <div>Meaning: <b>{mean}</b></div>
                }
                {
                    err && <div>Check your word & try again</div>
                }
            </div>

            <br />

            <hr />


            <div>
                {meanings.map((mean, index) => {
                    // console.log("The part of speach is :" ,mean[ "partOfSpeech"])
                    // console.log(mean["antonyms"])
                    // console.log(mean["definitions"])
                    // console.log(mean["synonyms"])
                    let antonyms = []
                    let meanings = []
                    let synonyms = []
                    let antonymsPresent = false;
                    let meaningsPresent = false;
                    let synonymsPresent = false;
                    mean["antonyms"].forEach((e) => {
                        antonyms.push(e, ", ")
                        antonymsPresent = true;
                    })
                    // console.log("The meanings are before " , mean["definitions"])

                    mean["definitions"].forEach((m) => {
                        // console.log(m["definition"])
                        meanings.push(m["definition"])
                        meaningsPresent = true;
                    })
                    mean["synonyms"].forEach((syn) => {
                        // console.log("synonym is ", syn)
                        synonyms.push(syn, ", ")
                        synonymsPresent = true;
                    })
                    // console.log("Before returning the syn is : ", synonyms)
                    return (<div key={index} className='leading-loose'>
                        <span className='font-semibold'>Part of speach : </span><span className=' 
             font-extrabold text-4xl font-mono tracking-wider '> {mean["partOfSpeech"]} </span> <br></br>
                        {synonymsPresent && <> <span className='font-semibold '>Synonyms :</span> {synonyms}</>}
                        <br></br>

                        {meaningsPresent && <>The <span className='font-semibold tracking-wider'>Meanings</span> are :  <ol>
                            {meanings.map((m, i) => {
                                return (
                                    <li className='list-decimal px-5 mx-5 text-wrap' key={m}>{m}</li>
                                );
                            })} </ol> </>}

                        {antonymsPresent && <> <span className='font-semibold'>Antonyms : </span>{antonyms}   <br></br></>}
                        <br></br>
                        <hr></hr>
                        <br></br>
                    </div>)
                })}





            </div>















        </div>
    );
};





export default Dictionary;