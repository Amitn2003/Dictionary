// import React, { useEffect, useState } from 'react'
// // const dictionaryAPI = async (w) => {
// //   await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${w}`)
// //     .then((d) => d.json())
// //     .then((d) => {
// //       // console.log(d)
// //       // console.log(d[0])
// //       // console.log(d[0]["meanings"])
// //       console.log(d[0]["meanings"][0])
// //       console.log(d[0]["meanings"][0]["definitions"])
// //       setDefinitions(d[0]["meanings"][0]["definitions"])
// //     })
// //     .catch((e) => {
// //       console.log(e)
// //     })
// // }

// const Dictionary = ({ word }) => {
//   // const [first, setfirst] = useState(word)
//   // const [mean, setMean] = useState("")
//   // const [definition, setDefinitions] = useState([])
  
//   // const dictionaryAPI = (w) => {
//   //   fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${w}`)
//   //     .then((res) => {
//   //       return res.json();
//   //     })
//   //     .then((d) => {
//   //       // console.log(d[0]["meanings"][0]["definitions"])
//   //       let arr = []
//   //       d[0]["meanings"][0]["definitions"].forEach((def, index) => {
//   //         arr.push(def["definition"])
//   //       })
//   //       setMean(arr[0])
//   //       console.log(arr)
//   //       setDefinitions(arr)
//   //       // setDefinitions(d[0]["meanings"][0]["definitions"])
//   //     })
//   //     .catch((e) => {
//   //       console.log("Error is : ----------", e)
//   //     })
//   //   return;
//   //   // console.log(definition)
//   // }
//   // if (word == "") {
//   //   // console.log("No word came as param")
//   // }
//   // else {
//   //   // setMean(dictionaryAPI(word))
//   //   dictionaryAPI(word)
//   // }







//   const [mean, setMean] = useState("");
//   const [definitions, setDefinitions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);


//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }
//   useEffect(() => {
//     if (word !== "") {
//       fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
//         .then((res) => res.json())
//         .then((data) => {
//           const meanings = data[0]?.meanings;
//           if (meanings && meanings.length > 0) {
//             const firstMeaning = meanings[0];
//             const firstDefinition = firstMeaning?.definitions[0]?.definition;
//             setMean(firstDefinition);
//             setDefinitions(firstMeaning?.definitions.map(def => def.definition));
//           } else {
//             setError("No meanings found for this word.");
//           }
//         })
//         .catch((error) => {
//           setError("Error fetching data.");
//           console.error("Error fetching data:", error);
//         })
//         .finally(() => setLoading(false));
//     } else {
//       setLoading(false);
//     }
//   }, [word]);








//   return (
    
//     <div>
//     {

//       // <div>
//     //   {word == "" && <span> word is not given!!<br></br></span>}
//     //   The parameters are  {word} <br></br>
//     //   The meaning is : {mean} <br></br>
//     //   The definitions are
//     //   <ul> {definition.map((d, index) => {
//     //     return <li key={index}>{d}</li>
//     //   })
//     //   }
//     //   </ul>
//     // </div>
//     }
//       {word === "" && <div>Word is not provided.</div>}
//       <div>The word is: {word}</div>
//       <div>The meaning is: {mean}</div>
//       <div>
//         The definitions are:
//         <ul>
//           {definitions.map((def, index) => (
//             <li key={index}>{def}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   )
// }

// export default Dictionary


import React, { useEffect, useState } from 'react';

const Dictionary = ({ word }) => {
  const [mean, setMean] = useState("");
  const [definitions, setDefinitions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
          } else { // Set loading state to false if no meanings are found
          }
        })
        .catch((error) => {
          setLoading(false); // Set loading state to false if there's an error fetching data
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
            setLoading(false); // Set loading state to false after successful API call
          } else {
            setError("No meanings found for this word.");
            setLoading(false); // Set loading state to false if no meanings are found
          }
        })
        .catch((error) => {
          setError("Error fetching data.");
          setLoading(false); // Set loading state to false if there's an error fetching data
          console.error("Error fetching data:", error);
          
        });
    }
  }, [word]);

  return (
    <div className='dictRoot'>
      {word.trim() === "" && <div>Word is not provided.</div>}
      {word.trim() != "" && <div>The word is: <b>{word}</b></div>}
      
        <div>
          {word.trim() != "" && <div>The meaning is: <b>{mean}</b></div>}
          <div>
          {word.trim() != "" && <span>The definitions are: </span>}
            <ol className='definations'>
              {definitions.map((def, index) => (
                <li key={index}>{def}</li>
              ))}
            </ol>
          </div>
        </div>
    </div>
  );
};





export default Dictionary;