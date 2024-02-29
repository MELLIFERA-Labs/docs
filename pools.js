export default [
  {
    name: "Cosmos Hub",
    chainId: "cosmoshub-4",
    val_name: "cosmoshub",
    runtime: "@kyvejs/tendermint-bsync",
    datasource: "Self hosted Gaia full node (cosmoshub-4)",
    start_data: "height 5,200,791",
    storage_provider: "Bundlr",
    networks: {
      Mainnet: 0,
      Kaon: 0,
      Korellia: 24,
    },
    requirements: [
      "2 or more physical CPU cores",
      "16 GB RAM",
      "512 GB DISK",
      "50mbps network bandwith",
    ],
    goal: "The goal of this pool is to validate and archive all blocks from Cosmos Hub permanently and decentralized. With this data we want to make it possible for other nodes to block sync the data from KYVE, making expensive archival nodes on Cosmos obsolete in the long run.",
    hex: "#1c2049",
    logo: "ar://GSK9zAQx1jOnQIhbM20qCoOFYT3EJXIJfwfvT_QhLVM",
    description:
      "Serving as the economic center of the Interchain, the Cosmos Hub is a blockchain that provides vital ecosystem services. The primary token of the Cosmos Hub is the ATOM, but the Hub will support many tokens in the future.",
  },
  {
    name: "Osmosis",
    chainId: "osmosis-1",
    val_name: "osmosis",
    runtime: "@kyvejs/tendermint",
    datasource: "Self hosted Osmosis full node (osmosis-1)",
    start_data: "Genesis",
    storage_provider: "Bundlr",
    networks: {
      Mainnet: 1,
      Kaon: 1,
      Korellia: 30,
    },
    requirements: [
      "8 or more physical CPU cores",
      "32 GB RAM",
      "1 TB DISK",
      "100mbps network bandwith",
    ],
    goal: "The goal of this pool is to validate and archive all blocks and block results from Osmosis permanently and decentralized. With this data we want to make it possible for other nodes to block sync the data from KYVE, making expensive archival nodes on Osmosis obsolete in the long run. In addition, the validated archived block results enable a number of further use cases for data analysis.",
    hex: "#8d07c7",
    logo: "ar://u8kGlBx37seQCO1X5vQsc3Q8iO2CE-BHqsm0937poak",
    description:
      "Osmosis, dubbed the Interchain Liquidity Lab, is a decentralized exchange (DEX) for Cosmos, an ecosystem of sovereign, interoperable blockchains all connected trustlessly over IBC, the Inter-Blockchain Communication Protocol.",
    binaryVersion: "v3.1.0",
    goVersion: "go15",
    binaryName: "osmosisd",
    binaryDownload:
      "https://github.com/osmosis-labs/osmosis/releases/tag/v3.1.0",
    installInstructions: "https://docs.osmosis.zone/osmosis-core/osmosisd/",
  },
  {
    name: "Archway // State-Sync",
    chainId: "archway-1",
    val_name: "archway-ssync",
    runtime: "@kyvejs/tendermint-ssync",
    datasource: "KSYNC (over serve-snapshots)",
    start_data: "state-sync snapshots every 3,000 blocks",
    storage_provider: "Bundlr",
    networks: {
      Mainnet: 4,
      Kaon: 4,
    },
    blockPoolId: 2,
    nodeName: "Archway",
    configName: ".archway",
    requirements: [
      "8 or more physical CPU cores",
      "32 GB RAM",
      "150 GB DISK",
      "100mbps network bandwith",
    ],
    goal: "The goal of this pool is to validate and archive state-sync snapshots from Archway permanently and decentralized. With this data, we want to make it possible for other nodes to state-sync the data from KYVE, making expensive archival nodes on Archway obsolete in the long run.",
    hex: "#e45121",
    logo: "ar://hKb8dVx4E1NCUJ_BlhNOcyfQEta5r38SBXqsfPnAsWE",
    description:
      "Archway is a Cosmos-native incentivized smart contract chain that enables developers to deploy high-performance dapps that earn rewards based on the traffic they bring to the network. As developers build and launch impactful dapps, they receive a proportional share of network fees, inflation, and premiums. At its core, Archway is designed to enable developers to capture the value they create through sustainable economic models built into the blockchain.",
    binaryVersion: "v1.0.1",
    goVersion: "go19",
    binaryName: "archwayd",
    binaryDownload:
      "https://github.com/archway-network/archway/releases/tag/v1.0.1",
    installInstructions:
      "https://docs.archway.io/validators/running-a-node/join-a-network/sync-from-genesis",
    genesisFile:
      "https://github.com/archway-network/networks/raw/main/archway/genesis/genesis.json.gz",
    seed: "3ba7bf08f00e228026177e9cdc027f6ef6eb2b39@35.232.234.58:26656",
  },
  {
    name: "Archway",
    chainId: "archway-1",
    val_name: "archway",
    runtime: "@kyvejs/tendermint",
    datasource: "Self hosted Osmosis full node (archway-1)",
    start_data: "Genesis",
    storage_provider: "Bundlr",
    networks: {
      Mainnet: 2,
      Kaon: 2,
      Korellia: 31,
    },
    requirements: [
      "8 or more physical CPU cores",
      "32 GB RAM",
      "1 TB DISK",
      "100mbps network bandwith",
    ],
    goal: "The goal of this pool is to validate and archive all blocks and block results from Archway permanently and decentralized. With this data we want to make it possible for other nodes to block sync the data from KYVE, making expensive archival nodes on Archway obsolete in the long run. In addition, the validated archived block results enable a number of further use cases for data analysis.",
    hex: "#e45121",
    logo: "ar://hKb8dVx4E1NCUJ_BlhNOcyfQEta5r38SBXqsfPnAsWE",
    description:
      "Archway is a Cosmos-native incentivized smart contract chain that enables developers to deploy high-performance dapps that earn rewards based on the traffic they bring to the network. As developers build and launch impactful dapps, they receive a proportional share of network fees, inflation, and premiums. At its core, Archway is designed to enable developers to capture the value they create through sustainable economic models built into the blockchain.",
    binaryVersion: "v1.0.1",
    goVersion: "go19",
    binaryName: "archwayd",
    binaryDownload:
      "https://github.com/archway-network/archway/releases/tag/v1.0.1",
    installInstructions:
      "https://docs.archway.io/validators/running-a-node/join-a-network/sync-from-genesis",
    genesisFile:
      "https://github.com/archway-network/networks/raw/main/archway/genesis/genesis.json.gz",
    seed: "3ba7bf08f00e228026177e9cdc027f6ef6eb2b39@35.232.234.58:26656",
  },
];
