import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    NumberInput,
    NumberInputField,
    Spacer,
    Text,
    Textarea,
    useDisclosure,
  } from "@chakra-ui/react";
  import { useContext, useState } from "react";
  import { useToast } from "@chakra-ui/react";
  import { Web3Storage } from "web3.storage";
  import { Web3Context } from "../context/Web3Context";
  const Create = () => {
    const { account, connectWallet, createCampaign } = useContext(Web3Context);
    const [cover, setCover] = useState("");
    const [pdfs, setPdfs] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [add_imgs, setAddImgs] = useState("");
    const [deadline, setDeadline] = useState(Date);
    const [target, setTarget] = useState(0);
    const [link, setLink] = useState("");
    const [vid, setVid] = useState("");
    const [update,setUpdate] = useState([])
    const toast = useToast();
    function getAccessToken() {
      return process.env.NEXT_PUBLIC_WEB3STORAGE_TOKEN;
    }
    function makeStorageClient() {
      return new Web3Storage({ token: getAccessToken() });
    }
    const saveCover = async (f) => {
      const client = makeStorageClient();
      const cid = await client.put(f);
      console.log("stored files with cid:", cid);
      return cid;
    };
    const saveImgs = async (f) => {
      const client = makeStorageClient();
      const cid = await client.put(f);
      console.log("stored files with cid:", cid);
      return cid;
    };
  
    const savePdf = async (f) => {
      const client = makeStorageClient();
      const cid = await client.put(f);
      console.log("stored files with cid:", cid);
      return cid;
    };
  
    const makeJsonData = async (image, pdf, imgcid) => {
      let list = [];
  
      for (let i = 0; i < add_imgs.length; i++) {
        list.push(add_imgs[i].name);
      }
      console.log(list);
      const obj = {
        title: title,
        description: desc,
        image: `${image}/${cover[0].name}`,
        pdf: `${pdf}/${pdf ? pdfs[0].name : ""}`,
        target: target,
        deadline: deadline,
        website: link,
        video: vid,
        imgCID: imgcid,
        imgs: list,
      };
      const blob = new Blob([JSON.stringify(obj)], {
        type: "application/json",
      });
      const files = [new File([blob], `.json`)];
      return files;
    };
  
    async function storeJsonData(files) {
      const client = makeStorageClient();
      const cid = await client.put(files);
      console.log("stored files with cid:", cid);
  
      return cid;
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      toast({
        title: "In Progress",
        description: "Uploading files",
        status: "loading",
        duration: 9000,
        isClosable: true,
      });
  
      const image = await saveCover(cover);
      const pdf = pdfs ? await savePdf(pdfs) : "";
      const imgs = imgs?await saveImgs(add_imgs):"";
      const files = await makeJsonData(image, pdf, imgs);
      const url = storeJsonData(files);
      const d = Date.parse(deadline);
      console.log(d);
      console.log(deadline);
      createCampaign(target, d, url);
    };
  
    return (
      <Box p={10} pt={100} w={"100%"}>
        <Heading fontSize={"x-large"}>Create a Campaign</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel htmlFor="desc" accept="image/png, image/jpeg">
              Cover Image
            </FormLabel>
            <Input
              type="file"
              name="coverimage"
              id="coverimage"
              accept="image/png, image/jpeg"
              onChange={(e) => setCover(e.target.files)}
            />
          </FormControl>
          <Spacer p={2} />
          <FormControl isRequired>
            <FormLabel htmlFor="title">Campaign Title</FormLabel>
            <Input
              id="title"
              name="title"
              placeholder="Your Campaign Name"
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <Spacer p={2} />
          <FormControl isRequired>
            <FormLabel htmlFor="desc">Campaign Descriptions</FormLabel>
            <Textarea
              id="desc"
              type="text"
              placeholder="Describe your campaign in details"
              size="md"
              h={"30vh"}
              onChange={(e) => setDesc(e.target.value)}
            />
            
          </FormControl>
          <Spacer p={2} />
          <HStack>
            <FormControl isRequired>
              <FormLabel htmlFor="target">Target Amount</FormLabel>
              <NumberInput>
                <NumberInputField
                  id="target"
                  onChange={(e) => setTarget(e.target.value)}
                />
              </NumberInput>
            </FormControl>
  
            <FormControl isRequired>
              <FormLabel htmlFor="deadline">Deadline</FormLabel>
              <Input
                type="date"
                id="deadline"
                onChange={(e) => setDeadline(e.target.value)}
              />
            </FormControl>
          </HStack>
          <Spacer p={2} />
          <HStack>
            <FormControl>
              <FormLabel htmlFor="website">Website</FormLabel>
              <Input
                type="url"
                id="website"
                onChange={(e) => setLink(e.target.value)}
              />
            </FormControl>{" "}
            <FormControl>
              <FormLabel htmlFor="video">Video Link(Youtube/Vimeo...)</FormLabel>
              <Input
                placeholder="Share your video url"
                type="url"
                id="video"
                onChange={(e) => setVid(e.target.value)}
              />
            </FormControl>
          </HStack>
          <Spacer p={2} />
          <FormControl>
            <FormLabel htmlFor="add_docs">Additional Documents</FormLabel>
            <Input
              type="file"
              name="add_docs"
              id="add_docs"
              accept=".pdf"
              onChange={(e) => setPdfs(e.target.files)}
            />
          </FormControl>
          <Spacer p={4} />
          <FormControl>
            <FormLabel htmlFor="add_imgs">Additional Images</FormLabel>
            <Input
              type="file"
              name="add_imgs"
              id="add_imgs"
              accept="image/png, image/jpeg"
              onChange={(e) => setAddImgs(e.target.files)}
              multiple="multiple"
            />
          </FormControl>
          <Spacer p={4} />
          <Button mt={4} colorScheme="blue" type="submit">
            Submit
          </Button>
        </form>
      </Box>
    );
  };
  
  export default Create;
  