const {Router}= require("express");
const run=require("../geminiApi");
const router=Router();

router.post("/prompt-post",async(req,res)=>{
    try{
        const{prompt} = req.body;

        if(!prompt||typeof prompt!=="string"){
            return res.status(404).json({error:"Invalid prompt format"});
    }
    const response =await run(prompt);
    res.json({success: true, response});  
    }catch(err){
        console.error("Error in /prompt-post:",err);
        res.status(500).json({error:"Internal server error"});
    }
});

module.exports = router;