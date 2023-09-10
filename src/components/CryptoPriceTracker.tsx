import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import {
  Spinner,
  Card,
  CardBody,
  Button,
  useDisclosure,
  Input,
  Spacer,
  Flex,
  Box,
  Text,
} from "@chakra-ui/react";
import { AiOutlineArrowRight } from "react-icons/ai";
import ViewDetail from "./ViewDetail";

interface CryptoInfo {
  id: string;
  name: string;
  symbol: string;
  action: string;
}

const CryptoPriceTracker: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoInfo[]>([]);
  const [searchByName, setSearchByName] = useState<string>("");
  const [coinId, setCoinId] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchCryptoData = async () => {
    try {
      const response = await axios.get<CryptoInfo[]>(
        `${process.env.REACT_APP_API_BASE_URL}/coins/list`
      );

      const first8CryptoData = response.data.slice(0, 15);
      if (first8CryptoData) setCryptoData(first8CryptoData);
    } catch (error) {
      console.error("Error fetching crypto data:", error);
      console.log(error);
    }
  };

  let filteredData = cryptoData;
  filteredData = searchByName
    ? cryptoData?.filter((item) => {
        return item.name
          .toLowerCase()
          .startsWith(searchByName.toLowerCase().trim());
      })
    : filteredData;

  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 60000);
    return () => clearInterval(interval);
  }, []);

  const columns = [
    {
      name: "ID",
      selector: (row: CryptoInfo) => row.id,
    },
    {
      name: "NAME",
      selector: (row: CryptoInfo) => row.name,
    },
    {
      name: "SYMBOL",
      selector: (row: CryptoInfo) => row.symbol,
    },
    {
      name: "Actions",
      selector: (row: CryptoInfo) => row.id,
      cell: (row: CryptoInfo) => (
        <Button
          onClick={() => {
            onOpen();
            setCoinId(row?.id);
          }}
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          _hover={{
            bgGradient: "linear(to-l, #7928CA, #FF0080)",
            color: "#ffffff",
          }}
          color={"white"}
          size={"sm"}
        >
          detail
          <AiOutlineArrowRight />
        </Button>
      ),
    },
  ];

  return (
    <Card>
      <CardBody>
        <Flex>
          <Box>
            <Text>CRYPTO PRICE TRACKER</Text>
          </Box>
          <Spacer />
          <Box>
            <Input
              mb={4}
              type="text"
              placeholder="Search by name..."
              onChange={(e) => setSearchByName(e.target.value)}
            />
          </Box>
        </Flex>

        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          progressPending={!cryptoData}
          progressComponent={<Spinner />}
        />
      </CardBody>
      <ViewDetail
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        coinId={coinId}
      />
    </Card>
  );
};

export default CryptoPriceTracker;
