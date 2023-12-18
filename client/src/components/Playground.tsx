import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
// import { ExpandMore } from "@mui/icons-material";
import { useState, useEffect } from "react";
import "../index.css";


const Playground = () => {
   const [isExpanded, setIsExpanded] = useState(false);   
   const [items, setItems] = useState<any>([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<any>(null);
   const [page, setPage] = useState(1);
   const totalChildren = 100;

   const fetchData = async () => {
      setIsLoading(true);
      setError(null);
    
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${page}`);
        const data = await response.json();
    
        setItems((prevItems: any) => [...prevItems, ...data]);
        setPage(prevPage => prevPage + 1);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);

    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
        return;
      }
      fetchData();
    };
    
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading]);

   // const handleChildLoaded = (index: number) => {      
   //    let t = new Date().getTime();
      
   //    if(index === 0) {
   //       console.log(`First Child loaded at: ${t} ms`);
   //       firstChildLoadedAt = t;
   //    }
            
   //    if (index === totalChildren-1) {
   //       console.log("----------------------------------------------------")
   //       console.log(`All children loaded at: ${t} ms, total time taken: ${t - firstChildLoadedAt} ms`);
   //       console.log("----------------------------------------------------")
   //    }
   // }

    if(page === 10) {
      console.log("data", items)
    }
    
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
         {isLoading && <div className="loader"></div>}
         {error && <p>Error: {error.message}</p>}
         {
            items.map((item: any, index: number) => (
               <Card key={`card-${index}`} name={item.name} body = {item.body} setIsExpanded={setIsExpanded} isExpanded={isExpanded} />
            ))            
         }
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

   // useEffect(() => {
   //    const fetchDataAndNotifyParent = async () => {
   //      try {
   //        // Simulate API call
   //        await props.fetchData(props.index);
  
   //        // Notify the parent that this child component has loaded
   //        props.onLoaded(props.index  );
   //      } catch (error) {
   //        console.error('Error fetching data in child component:', error);
   //      }
   //    };
  
   //    fetchDataAndNotifyParent();
   //  }, [props.fetchData, props.onLoaded]);

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
               <AccordionSummary>{props.name}</AccordionSummary>
               <AccordionDetails>
                  <p>{props.body}</p>
               </AccordionDetails>
            </Accordion>
         </div>
      </div>
   );
};
