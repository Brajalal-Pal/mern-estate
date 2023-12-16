import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { useState, useEffect } from "react";

const Playground = () => {
   const [isExpanded, setIsExpanded] = useState(false);
   return (
      <div style={{ padding: "20px" }}>
         <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
               border: "1px solid #eee",
               fontSize: "12px",
               padding: "8px",
               color: "white",
               borderRadius: "5px",
               backgroundColor: "green",
               marginBottom: "10px",
            }}
         >
            Toggle Expand/Collapse
         </button>
         <Card title="Testing Prospect with Multiple blocks" setIsExpanded={setIsExpanded} isExpanded={isExpanded} />
         <Card title="Mutex Opportunity - Test" setIsExpanded={setIsExpanded} isExpanded={isExpanded} />
         <Card title="Updated by - Brajalal" setIsExpanded={setIsExpanded} isExpanded={isExpanded} />
      </div>
   );
};

export default Playground;

const Card = (props: any) => {
   const { title } = props;
   const [isExpanded, setIsExpanded] = useState(props.isExpanded);

   useEffect(() => {
      setIsExpanded(props.isExpanded);
   }, [props.isExpanded]);

   return (
      <div
         style={{
            width: "400px",
            border: "1px solid #eed",
            // margin: "5px",
            // padding: "20px",
            backgroundColor: "white",
            overflow: "hidden",
            marginBottom: "10px",
         }}
      >
         <h1 style={{ fontWeight: "bold", padding: "10px", backgroundColor: "#eed" }}>{title}</h1>
         <hr />
         <div>
            <button
               onClick={() => setIsExpanded(!isExpanded)}
               style={{ border: "1px solid #eee", fontSize: "12px", padding: "3px", color: "gray", backgroundColor: "gold" }}
            >
               {isExpanded ? "Show Less.." : `Show more...`}
            </button>
            <Accordion expanded={isExpanded}>
               <AccordionSummary>Details:</AccordionSummary>
               <AccordionDetails>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, quibusdam.</p>
               </AccordionDetails>
            </Accordion>
         </div>
      </div>
   );
};
