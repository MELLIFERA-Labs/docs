import axios from "axios";
import { load } from "js-yaml";
import React, { useEffect, useMemo, useState } from "react";
import Modal from "../ui/Modal";
import Admonition from "@theme/Admonition";
import { useLocation, useHistory } from "@docusaurus/router";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import CodeBlock from "@theme/CodeBlock";

const useSelectedSource = () => {
  const [selected, setInternSelected] = useState<any>();
  const [search, setSearch] = useState("");
  const [onKaon, setOnKaon] = useState(false);
  const [registry, setRegistry] = useState<any>();
  const location = useLocation();
  const history = useHistory();

  const setSelected = (source: any) => {
    history.replace(location.pathname + "?" + source["source-id"]);
    setInternSelected(source);
  };

  useEffect(() => {
    const loadRegistry = async () => {
      const { data } = await axios.get(
        "https://raw.githubusercontent.com/KYVENetwork/source-registry/main/.github/registry.yml"
      );
      const parsedRegistry = load(data);
      setRegistry(parsedRegistry);
      if (location.search) {
        const source = parsedRegistry[location.search.slice(1)];
        if (source) {
          setSelected(source);
          return;
        }
      }
      setSelected(parsedRegistry["archway-1"]);
    };
    loadRegistry();
  }, []);

  useEffect(() => {
    if (selected) setOnKaon(selected["networks"]["kyve-1"] === undefined);
  }, [selected]);

  return [registry, selected, setSelected, search, setSearch, onKaon];
};

const QuickStart = () => {
  const [registry, selected, setSelected, search, setSearch, onKaon] =
    useSelectedSource();

  const [height, setHeight] = useState<string | undefined>();

  const genesisFile = useMemo(() => {
    try {
      return selected["codebase"]["settings"]["cosmos-properties"][
        "genesis-url"
      ];
    } catch {}
    return undefined;
  }, [selected]);

  const ksync = useMemo(() => {
    if (!selected) return;
    try {
      return selected["networks"]["kyve-1"]["integrations"]["ksync"];
    } catch {}
    return selected["networks"]["kaon-1"]["integrations"]["ksync"];
  }, [selected]);

  const genesisVersion = useMemo(() => {
    if (!selected) return;
    return selected["codebase"]["settings"]["upgrades"][0][
      "recommended-version"
    ];
  }, [selected]);

  if (!registry || !selected) return "Loading ...";

  const getProperties = (source) => {
    if (source["networks"]["kyve-1"])
      return source["networks"]["kyve-1"].properties;
    if (source["networks"]["kaon-1"])
      return source["networks"]["kaon-1"].properties;
  };

  const logoUrl = (source) => {
    return (
      "https://arweave.net/" + getProperties(source).logo.replace("ar://", "")
    );
  };

  const label = () => {
    return (
      <div className="flex flex-nowrap items-center cursor-pointer select-none border-solid border-borderColor border rounded-md p-2 menu__link dark:text-white text-black font-bold text-xl">
        <img src={logoUrl(selected)} className="w-12 h-12 rounded-md mr-2" />
        {getProperties(selected).title}
      </div>
    );
  };

  const sources = () => {
    return Object.keys(registry)
      .map((x) => registry[x])
      .filter((x) => getProperties(x).title.startsWith(search));
  };

  const SyncCommand = ({ sync }: { sync: string }) => {
    return (
      <div>
        <CodeBlock language="bash">
          ksync {sync.toLowerCase()} --binary="/path/to/{ksync["binary-name"]}/"
          --source="
          {getProperties(selected).title.toLowerCase()}"{" "}
          {height && `--target-height=${height}`}
        </CodeBlock>
      </div>
    );
  };

  return (
    <div>
      {onKaon && (
        <Admonition type="warning" className="mb-2">
          {getProperties(selected).title} is only available on{" "}
          <code>kaon-1</code>
        </Admonition>
      )}
      <div className="flex flex-nowrap items-end">
        <h2 className="mb-0">Select Source:</h2>
        <div className="ml-auto">
          <Modal label={label}>
            <div className="flex flex-nowrap items-center menu__link">
              <input
                className="bg-transparent outline-none border-none font-bold text-lg w-48"
                placeholder="Search"
                onChange={(x) => setSearch(x.target.value)}
                autoFocus
                value={search}
                onClick={(e) => e.stopPropagation()}
              />
              <span
                className="cursor-pointer font-bold"
                onClick={(e) => {
                  setSearch("");
                  e.stopPropagation();
                }}
              >
                X
              </span>
            </div>
            <div
              className="max-h-96 overflow-y-scroll"
              style={{ scrollbarWidth: "none" }}
            >
              {sources().map((source, index) => (
                <div
                  key={index}
                  className={
                    "menu__link cursor-pointer flex flex-nowrap " +
                    (source == selected ? "text-primary" : "")
                  }
                  onClick={() => {
                    setSelected(source);
                    setTimeout(() => setSearch(""), 250);
                  }}
                >
                  <img
                    src={logoUrl(source)}
                    className="w-8 h-8 rounded-md mr-2"
                  />
                  {getProperties(source).title}
                </div>
              ))}
            </div>
          </Modal>
        </div>
      </div>
      <hr />
      <div>
        First of all, it is required to download and setup the correct version
        of <code>{ksync["binary-name"]}</code> with the genesis file in order to
        use any kind of Sync. You can download a prebuild binary{" "}
        <a href={""}>here</a> or follow the{" "}
        <a href={ksync["docs-url"]}>{getProperties(selected).title} Docs.</a>
      </div>
      <div>
        Verify the installation with:
        <CodeBlock language="bash">
          ./{ksync["binary-name"]} version{"\n" + genesisVersion}
        </CodeBlock>
      </div>
      <div>
        After the installation, init the config:
        <CodeBlock language="bash">
          ./{ksync["binary-name"]} init &lt;your-moniker&gt; --chain-id{" "}
          {selected["source-id"]}
        </CodeBlock>
      </div>
      <div>
        Download the genesis:
        <CodeBlock language="bash">
          {genesisFile.endsWith(".gz")
            ? `wget -qO- ${genesisFile} | zcat > ~/.${ksync[
                "binary-name"
              ].slice(0, -1)}/config/genesis.json`
            : `wget -qO- ${genesisFile} | cat > ~/.${ksync["binary-name"].slice(
                0,
                -1
              )}/config/genesis.json`}
        </CodeBlock>
      </div>
      <h1>Start the Sync</h1>
      <Tabs>
        <TabItem value="block" label="Block Sync">
          <SyncCommand sync="Block-Sync" />
        </TabItem>
        <TabItem value="state" label="State Sync">
          <SyncCommand sync="State-Sync" />
        </TabItem>
        <TabItem value="height" label="Height Sync">
          <SyncCommand sync="Height-Sync" />
        </TabItem>
      </Tabs>
      <input
        placeholder="target height"
        type="number"
        className="outline-none bg-transparent p-2 font-bold text-base border border-solid border-borderColor rounded-md w-full"
        onChange={(x) => setHeight(x.target.value)}
      />
    </div>
  );
};

export default QuickStart;
