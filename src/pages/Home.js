import React,{useState,useEffect} from 'react';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';






const Home =()=>{
  

   const [photos,setPhotos]= useState([]);
   const [color,setColor]=useState('yellow');
   const colorStyle = {color:"blue"}
   

useEffect(()=>{
    async function getData(){
        const result= await axios.get('https://jsonplaceholder.typicode.com/photos')
       
        setPhotos(result.data.slice(0,10))
        
    }
        
    getData()
})

const changeColor=(e)=>{
    const colorIndex= e.target.value
    console.log(colorIndex)

    setColor(!color)
  
  }

 return(
     <>
     <section>
     <div className="row">
     {
            photos.map((photo,index)=>{
                    
                    return (
                      
                    
                    <div key={index} className="col-md-4">
                    <div className="card">
                      <div className="card-image">
                        <img src={photo.thumbnailUrl} />
                        <span className="card-title">{photo.title}</span>
                      </div>
                      <div className="card-content">
                        <p>I am a very simple card. I am good at containing small bits of information.
                          I am convenient because I require little markup to use effectively.</p>
                      </div>
                      <div className="card-action">
                      <IconButton  onClick={changeColor} style={color ? colorStyle : null}>
                         <FavoriteIcon  />
                     </IconButton>
                      </div>
                    </div>
                  </div>
                    
                 ) })

            }

     </div>
     
     </section>
  </>
     )


 
}


export default Home