import { Box, FormControl, FormLabel, Icon, Input, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Upload from "rc-upload";


const AddMovie = () => {
  return (
    <>
       <div className="container1 ">
       
       <div className="forms-container">
         
         <div className="signin-signup">
           
           <form action="#" className="sign-in-form" 
           //</div>onSubmit={handleAddMed}
           >
             <h2 className="title">Add Movie</h2>
             <div className="input-field">
               <i className="fas fa-user"></i>
               <input type="text" placeholder="Title" 
               //value={medicine.name} 
              // onChange={(e)=>{setMedicine({...medicine,name: e.target.value})}}
              />
             </div>
             <div className="input-field">
               <i className="fas fa-user"></i>
               <input type="text" placeholder="Description" 
               //value={medicine.company} 
              // onChange={(e)=>{setMedicine({...medicine,company: e.target.value})}}
              />
             </div>
             <div className="input-field">
               <i className="fas fa-user"></i>
               <input type="text" placeholder="Duration" 
               //value={medicine.company} 
              // onChange={(e)=>{setMedicine({...medicine,company: e.target.value})}}
              />
             </div>
             <div className="input-field">
               <i className="fas fa-user"></i>
               <input type="number" placeholder="Trailer link" 
               //value={medicine.company} 
              // onChange={(e)=>{setMedicine({...medicine,company: e.target.value})}}
              />
             </div>
             <div className="input-field">
               <i className="fas fa-user"></i>
               <input type="number" placeholder="Rating" 
               //value={medicine.company} 
              // onChange={(e)=>{setMedicine({...medicine,company: e.target.value})}}
              />
             </div>
             <div className="input-field">
               <i className="fas fa-user"></i>
               <input type="number" placeholder="Ticket Price" 
               //value={medicine.company} 
              // onChange={(e)=>{setMedicine({...medicine,company: e.target.value})}}
              />
             </div>
             <div className="input-field">
               <i className="fas fa-user"></i>
               <input type="number" placeholder="Total seats" 
               //value={medicine.company} 
              // onChange={(e)=>{setMedicine({...medicine,company: e.target.value})}}
              />
             </div>
             <FormControl mb="3">
        <FormLabel>Poster</FormLabel>
        <Input type="file" display="none"
        //  {...register("images")} 
         />
        <Upload
          name="file"
        //   onProgress={({ percent }) => {
        //     setUploading(true);
        //     if (percent === 100) {
        //       setUploading(false);
        //     }
        //   }}
        //   onSuccess={(response, file) => {
        //     const { name, size, type, lastModified } = file;
        //     const images = [
        //       {
        //         name,
        //         size,
        //         type,
        //         lastModified,
        //         url: response.url,
        //       },
        //     ];

        //     setValue("images", images);
        //   }}
        //   action={`${apiUrl}/media/upload`}
        >
          <Box
            p="4"
            bg="gray.100"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            {/* {uploading ? (
              <span>The file is uploading...</span>
            ) : ( */}
              <>
                <Icon
                //  as={IconFileUpload}
                  w={8} h={8} mb="3" color="gray.600" />
                <Text color="gray.700" fontWeight="semibold">
                  Click or drag file to this area to upload
                </Text>
              </>
            {/* )} */}
          </Box>
        </Upload>
      </FormControl>
      <FormControl mb="3">
        <FormLabel>Banner</FormLabel>
        <Input type="file" display="none" 
        // {...register("images")} 
        />
        <Upload
          name="file"
        //   onProgress={({ percent }) => {
        //     setUploading(true);
        //     if (percent === 100) {
        //       setUploading(false);
        //     }
        //   }}
        //   onSuccess={(response, file) => {
        //     const { name, size, type, lastModified } = file;
        //     const images = [
        //       {
        //         name,
        //         size,
        //         type,
        //         lastModified,
        //         url: response.url,
        //       },
        //     ];

        //     setValue("images", images);
        //   }}
        //   action={`${apiUrl}/media/upload`}
        >
          <Box
            p="4"
            bg="gray.100"
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            {/* {uploading ? (
              <span>The file is uploading...</span>
            ) : ( */}
              <>
                <Icon
                //  as={IconFileUpload} 
                 w={8} h={8} mb="3" color="gray.600" />
                <Text color="gray.700" fontWeight="semibold">
                  Click or drag file to this area to upload
                </Text>
              </>
            {/* )} */}
          </Box>
        </Upload>
      </FormControl>
             

             <button className="btn1 solid">Add Movie </button>
             {/* //</form>onClick={handleAddMed}>{loading? <Loader size={8} color={"#fff"}/>: "Add Medicine"}
             </button> */}

           </form>

         </div>
       </div>

       <div className="panels-container">
         <div className="panel left-panel">
           <div className="content">
             <h3>Want to go Back</h3>
           <Link to="/user" className="btn btn-dark justify-content-end"> Back</Link>
           </div>
           <img src="/add.png" className="image" alt="" />
         </div>

       </div>
     </div> 
    </>
  )
}

export default AddMovie