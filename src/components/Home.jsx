import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { getDataError, getDataRequest, getDataSuccess,} from "../Redux/action"
import axios from "axios"
import { useEffect, useState } from "react"

import { Box, SimpleGrid, Card, CardHeader, CardBody, CardFooter, Text, Image, Stack, Heading, Flex, HStack, VStack, useColorModeValue, useDisclosure, Input } from "@chakra-ui/react"
import { SlLike } from "react-icons/sl";
import ModalBox from "../modal/Modal"

export const Data=()=>{

    const [search,setSearch]=useState("")
    const dispatch=useDispatch()

const {aata,isLoading}=useSelector((store)=>{
console.log( "store",store)
    return {
        aata:store.data,
        isLoading:store.isLoading
    }
},shallowEqual)

let allData=aata.results
console.log("data",allData)
const getData=(search)=>{
    dispatch(getDataRequest())
    if(search==""){
        search="nature"
    }
    axios.get(`https://api.unsplash.com/search/photos?page=1&query=${search}&client_id=WR079whtmDo2XfEAIIWnCOgE5AIa8NZynxcE-3su8oM`)
    .then((r)=>{dispatch(getDataSuccess(r.data))})
    .catch((e)=>{dispatch(getDataError())
    })
}


// const getTodoId=()=>{
// dispatch(getTodoRequest());

// axios.get("http://localhost:8080/data/")
//     .then((r)=>{dispatch(getTodoSuccess(r.data))})
//     .catch((e)=>{dispatch(getTodoError())
//     })








useEffect(()=>{
    getData(search)

},[search])

const handleChange=(e)=>{
    console.log(e.target.value)

}
console.log(search)
return (<div>
<Heading>Photos from the Unsplash</Heading>
<br />
<Box>
    <Input  value={search} width={"50%"} margin="auto" onChange={(e)=>setSearch(e.target.value)} placeholder="search here"/>
</Box>

<Box width={"80%"} margin={"auto"} mt={"20px"}>
            <SimpleGrid columns={[1, 2, 2, 3]} spacing={"40px"}>
                {
                    allData && allData.map((el) => (
                        <Box height='auto' padding={"20px"} borderRadius={"20px"} key={el.id} boxShadow={'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}>
                            <Image
                                src={el.urls.thumb}
                                alt='nature-img'
                                borderRadius='lg'
                                height={"250px"}
                                width={"100%"}

                            />
                            <Flex mt='6' flexDirection={{ base: "column", sm: "column", md: "row", lg: "row", xl: "row" }} spacing='3' justifyContent={"space-between"} alignItems={"center"} >
                                <Flex alignItems={"center"} gap={"10px"} flexDirection={{ base: "column", sm: "column", md: "row", lg: "row", xl: "row" }}>
                                    <Image src={el.user.profile_image.medium} alt={"user-img"} rounded={"full"} />
                                    <Box textAlign={{ base: "center", sm: "center", md: "left", lg: "left", xl: "left" }} >
                                        <Text fontWeight={"700"}  >{el.user.name}</Text>
                                        <Text fontWeight={"600"} color={"#A7A7A7"} fontSize={"14px"}>@{el.user.username}</Text>
                                    </Box>
                                </Flex>
                                <Flex gap={"5px"} alignItems={"center"}>
                                    <SlLike />
                                    <Text>{((el.likes) / 1000).toFixed(1)}K</Text>
                                </Flex>
                            </Flex>

                            {/* ------------------Modal Box----------------------------*/}
                            <ModalBox data={el} />


                        </Box>
                    ))
                }
            </SimpleGrid>
        </Box>

</div>)
}




