import React, { useEffect, useState } from 'react';

const Dictionary = ({ word }) => {
  const [mean, setMean] = useState("");
  const [definitions, setDefinitions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [audio, setAudio] = useState("")
  const [Synonym, setSynonym] = useState([])
  const [meanings, setMeanings] = useState([])


  const analyseAPI = (data) => {
    console.log("API analysys : ", data)
    setMeanings(data["meanings"]);
    // data["meanings"].forEach((mean, index) => {
    //     console.log(mean, index)
    // });

    data["meanings"].forEach((mean, index) => {
      console.log(mean, index)
      let obj = {}
      try {
        // console.log(mean["partOfSpeech"])
        // console.log(mean["antonyms"])
        // console.log(mean["definitions"])
        // console.log(mean["synonyms"])

      }
      catch {

      }
      // console.log(obj)
    });



  }















  useEffect(() => {
    if (word.trim() !== "") {
      setLoading(true);
      setMean("")
      setDefinitions([])
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
          } else {
            setLoading(false);
            // Set loading state to false if no meanings are found
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
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
          } else {
            setLoading(false); // Set loading state to false if no meanings are found
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [word]);

  return (
    <div className='dictRoot'>
      {word.trim() === "" && <div>Word is not provided.</div>}
      {word.trim() != "" && <div>The word is: <b>{word}</b></div>}

      <div>
        {word.trim() != "" && loading &&  <div>Meaning: <b>{mean}</b></div> }
        {
        // <div>
        //   {word.trim() != "" && <span>Definitions: {""} </span>}
        //   <ol className='definations'>
        //     {definitions.map((def, index) => (
        //       <li key={index}>{def}</li>
        //     ))}
        //   </ol>
        // </div> 
            }
      </div>

      <br /><br />




      <div>
        {meanings.map((mean, index) => {
          // console.log("The part of speach is :" ,mean[ "partOfSpeech"])
          // console.log(mean["antonyms"])
          // console.log(mean["definitions"])
          console.log(mean["synonyms"])
          let antonyms = []
          let meanings = []
          let synonyms = []
          mean["antonyms"].forEach((e) => [
            antonyms.push(e, ", ")
          ])
          // console.log("The meanings are before " , mean["definitions"])

          mean["definitions"].forEach((m) => {
            // console.log(m["definition"])
            meanings.push(m["definition"])
          })
          mean["synonyms"].forEach((syn) => {
            console.log("synonym is ", syn)
            synonyms.push(syn , ", ")
          })
          console.log("Before returning the syn is : ", synonyms)
          return (<div>
            The part of speach is : {mean["partOfSpeech"]} <br></br>
            The antonyms are : {antonyms}   <br></br>
            The Meanings are : <ol>
              {meanings.map((m, i) => {
                return (
                  <li key={m}>{m}</li>
                );
              })} </ol> <br></br>
            The synonyms are : {synonyms}

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