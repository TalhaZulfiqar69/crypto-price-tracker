import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  Button,
  AlertDialogFooter,
  Image,
  Stack,
  Heading,
  Text,
  Flex,
  Spacer,
  Box,
  Badge,
} from "@chakra-ui/react";

interface ViewDetailProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  coinId: string;
}

type CryptoInfo = {
  id: string;
  name: string;
  symbol: string;
  action: string;
  contract_address: string;
  last_updated: string;
  description: {
    uk: string;
  };
  image: {
    large: string;
  };
  market_data: {
    circulating_supply: number;
    current_price: {
      usd: string;
    };
  };
};

const ViewDetail: React.FC<ViewDetailProps> = ({
  isOpen,
  onOpen,
  onClose,
  coinId,
}) => {
  const [cryptoDetailData, setCryptoDetailData] = useState<CryptoInfo | null>(
    null
  );
  const cancelRef: any = useRef();

  const fetchCryptoData = async () => {
    try {
      const coinDetail = await axios.get<CryptoInfo, any>(
        `${process.env.REACT_APP_API_BASE_URL}/coins/${coinId}`
      );

      if (coinDetail) setCryptoDetailData(coinDetail?.data);
    } catch (error) {
      console.error("Error fetching crypto data:", error);
    }
  };

  useEffect(() => {
    if (coinId) fetchCryptoData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinId]);

  console.log(cryptoDetailData?.market_data?.current_price?.usd);

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        size={"4xl"}
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Coin Details</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Image
              width={"100%"}
              height={"30vh"}
              src={`${cryptoDetailData?.image?.large}`}
              alt={`${cryptoDetailData?.name}`}
              borderRadius="lg"
            />

            <Stack mt="6" spacing="3">
              <Flex>
                <Box>
                  <Heading>{cryptoDetailData?.name}</Heading>
                </Box>
                <Spacer />
                <Box justifyContent={"flex-end"}>
                  <Badge
                    borderRadius="full"
                    px="2"
                    bgGradient="linear(to-l, #7928CA, #FF0080)"
                    color={"white"}
                  >
                    <Text fontWeight={"bold"}>{cryptoDetailData?.symbol}</Text>
                  </Badge>
                </Box>
              </Flex>
              <Flex>
                <Text>{cryptoDetailData?.contract_address}</Text>
                <Spacer />
                <Badge
                  borderRadius="full"
                  px="2"
                  bgGradient="linear(to-l, #7928CA, #FF0080)"
                  color={"white"}
                >
                  <Text fontWeight={"bold"} mt={1} mb={1}>
                    {moment(cryptoDetailData?.last_updated).format(
                      "MM-DD-YYYY"
                    )}
                  </Text>
                </Badge>
              </Flex>
              <Text>{cryptoDetailData?.description?.uk}</Text>

              <Text color="blue.600" fontSize="2xl">
                {`$${cryptoDetailData?.market_data?.current_price?.usd}`}
              </Text>
            </Stack>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={onClose}
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              _hover={{
                bgGradient: "linear(to-l, #7928CA, #FF0080)",
                color: "#ffffff",
              }}
              color={"white"}
              size={"sm"}
            >
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ViewDetail;
