import { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Box, Button, HStack, Icon, Input, Radio, Text } from 'native-base';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useStore } from '../store/store';
import { shallow } from 'zustand/shallow';
import { Ionicons } from '@expo/vector-icons';
import { Product, SortBy } from '../store/types';
import { filterProducts, sortByArray, sortProducts } from '../utils/handleFilter';

interface FilterModalProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (value: boolean) => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({ isFilterOpen, setIsFilterOpen }) => {
  const [
    totalProducts,
    totalBrands,
    selectedBrands,
    totalModels,
    selectedModels,
    sortBy,
    setCurrProducts,
    setSortBy,
    setSelectedBrands,
    setSelectedModels,
  ] = useStore(
    (state) => [
      state.totalProducts,
      state.totalBrands,
      state.selectedBrands,
      state.totalModels,
      state.selectedModels,
      state.sortBy,
      state.setCurrProducts,
      state.setSortBy,
      state.setSelectedBrands,
      state.setSelectedModels,
    ],
    shallow
  );

  const [currBrands, setCurrBrands] = useState<string[]>(totalBrands);
  const [currModels, setCurrModels] = useState<string[]>(totalModels);

  const handleBrandSearch = (text: string) => {
    const newBrands = totalBrands.filter((b) => b.toLowerCase().includes(text.toLowerCase()));
    setCurrBrands(newBrands);
  };

  const handleModelSearch = (text: string) => {
    const newModels = totalModels.filter((b) => b.toLowerCase().includes(text.toLowerCase()));
    setCurrModels(newModels);
  };

  const handleSelectBrands = (isChecked: boolean, v: string) => {
    let newSelected = selectedBrands;

    if (isChecked) newSelected = [...selectedBrands, v];
    else newSelected = selectedBrands.filter((b) => b !== v);

    setSelectedBrands(newSelected);
  };

  const handleSelectModels = (isChecked: boolean, v: string) => {
    let newSelected = selectedModels;

    if (isChecked) newSelected = [...selectedModels, v];
    else newSelected = selectedModels.filter((m) => m !== v);

    setSelectedModels(newSelected);
  };

  const handleFilter = () => {
    const newCurrProducts = filterProducts(totalProducts, sortBy, selectedBrands, selectedModels);

    setCurrProducts(newCurrProducts, true);
    setIsFilterOpen(false);
  };

  return (
    <Box
      display={isFilterOpen ? 'flex' : 'none'}
      position="absolute"
      top="0"
      left="0"
      bottom="0"
      right="0"
      bgColor="white"
      zIndex={10}
      flex={1}
    >
      <ScrollView>
        <HStack
          justifyContent="space-between"
          alignItems="center"
          bgColor="white"
          shadow="4"
          px="5"
          py="4"
        >
          <Text fontSize="2xl">Filter</Text>
          <TouchableOpacity onPress={() => setIsFilterOpen(false)}>
            <Icon as={<Ionicons name="close" />} size={9} />
          </TouchableOpacity>
        </HStack>
        <Box mx="4">
          {/* Sort By */}
          <Box py="6" borderBottomWidth="1" borderBottomColor="blueGray.400">
            <Text color="blueGray.400" mb="3">
              Sort By
            </Text>
            <Radio.Group
              name="sortBy"
              defaultValue="Old to new"
              value={sortBy}
              onChange={(nextValue) => {
                setSortBy(nextValue as SortBy);
              }}
            >
              {sortByArray.map((v) => (
                <Radio key={v} value={v} my="1" colorScheme="blue">
                  {v}
                </Radio>
              ))}
            </Radio.Group>
          </Box>
          {/* Brand */}
          <Box py="6" borderBottomWidth="1" borderBottomColor="blueGray.400">
            <Text color="blueGray.400" mb="3">
              Brand
            </Text>
            {/* Search */}
            <Box px="1" py="1" bgColor="blueGray.100" mb="5">
              <Input
                onChangeText={(text) => handleBrandSearch(text)}
                fontSize="md"
                InputLeftElement={
                  <Icon as={<Ionicons name="search" />} size={4} ml="2" mr="2" color="muted.400" />
                }
                placeholder="Search"
                placeholderTextColor="#888"
                variant="unstyled"
                autoCapitalize="none"
              />
            </Box>
            <HStack flexWrap="wrap" flexDirection="row" space="2">
              {currBrands.map((v) => (
                <Box key={v} width="47%" mb="2">
                  <BouncyCheckbox
                    size={20}
                    fillColor="#3b82f6"
                    unfillColor="#FFFFFF"
                    text={v}
                    iconStyle={{ borderRadius: 2 }}
                    innerIconStyle={{ borderWidth: 1, borderRadius: 2 }}
                    textStyle={{ fontFamily: 'Montserrat-Regular', textDecorationLine: 'none' }}
                    onPress={(isChecked: boolean) => handleSelectBrands(isChecked, v)}
                  />
                </Box>
              ))}
            </HStack>
          </Box>
          {/* Model */}
          <Box py="6" borderBottomWidth="1" borderBottomColor="blueGray.400">
            <Text color="blueGray.400" mb="3">
              Model
            </Text>
            {/* Search */}
            <Box px="1" py="1" bgColor="blueGray.100" mb="5">
              <Input
                onChangeText={(text) => handleModelSearch(text)}
                fontSize="md"
                InputLeftElement={
                  <Icon as={<Ionicons name="search" />} size={4} ml="2" mr="2" color="muted.400" />
                }
                placeholder="Search"
                placeholderTextColor="#888"
                variant="unstyled"
                autoCapitalize="none"
              />
            </Box>

            <HStack flexWrap="wrap" flexDirection="row" space="2">
              {currModels.map((v) => (
                <Box key={v} width="47%" mb="2">
                  <BouncyCheckbox
                    size={20}
                    fillColor="#3b82f6"
                    unfillColor="#FFFFFF"
                    text={v}
                    iconStyle={{ borderRadius: 2 }}
                    innerIconStyle={{ borderWidth: 1, borderRadius: 2 }}
                    textStyle={{ fontFamily: 'Montserrat-Regular', textDecorationLine: 'none' }}
                    onPress={(isChecked: boolean) => handleSelectModels(isChecked, v)}
                  />
                </Box>
              ))}
            </HStack>
          </Box>
          {/* Filter Button */}
          <Button onPress={handleFilter} colorScheme="blue" size="md" mb="7">
            Filter Out
          </Button>
        </Box>
      </ScrollView>
    </Box>
  );
};
