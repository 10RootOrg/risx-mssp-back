/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("tools").del();
  await knex("tools").insert([
    {
      tool_id: 2000000,
      Tool_name: "Velociraptor",
      BoxType: "Velociraptor",
      headline: "Velociraptor",
      // isActive: true,
      ShowInUi: true,
      logoAddress_1: "./Logos/Velociraptor.svg",
      logoAddress_2: "",
      iconAddress: "./icons/General-icons-risx.svg",
      description_short: "Endpoint visibility and rapid response platform",
      description_long:
        "Velociraptor is an innovative endpoint security solution offering extensive visibility and rapid response capabilities. It revolutionizes incident detection and mitigation by providing real-time insights into endpoint activities across the network. With its advanced features, Velociraptor enables security teams to efficiently monitor and analyze endpoint behavior, detect threats, and respond promptly to security incidents. Its flexible and modular architecture allows for seamless integration with existing security infrastructure, enhancing overall security posture. By automating investigative processes and facilitating proactive threat hunting, Velociraptor empowers organizations to stay ahead of emerging threats and protect their assets effectively",
      Status: "blue",
      buttonTitle: "Active",
      toolURL: "",
      ServicePackage: "Standard",
      threshold_time: 24,
      arguments: { tags: [] },
      positionNumber: 0,
      useResourceType: "",
      toolType: "link",
      LastRun: "2024-06-02 10:15:17",
    },
    {
      tool_id: 2001000,
      Tool_name: "Risx",
      BoxType: "Tools_a",
      headline: "AD Security Platform",
      isActive: false,
      ShowInUi: false,
      logoAddress_1: "./Logos/10Root.svg",
      logoAddress_2: "",
      iconAddress: "./icons/General-icons-risx.svg",
      description_short: "All-In-One holistic AD security platform",
      description_long:
        "Risx is an All-In-One Holistic AD security Platform Risx consists of plug-ins based modules that can be easily customized or extended with new functionality. The Security posture analytics module is designed to discover, identify and prioritize cyber security threats on AD Service & the underline OS and Present them in a simple, intuitive way, in order to manage them intelligently.The KerbShield module designed to Detect & Prevent AD attacks in Real Time utilizing conditional access and contextual authorization",
      Status: "blue",
      buttonTitle: "Active",
      toolURL: "http://risxserverdev.westeurope.cloudapp.azure.com:3001/login/",
      ServicePackage: "Standard",
      threshold_time: 24,
      arguments: { tags: [] },
      useResourceType: "",
      positionNumber: 1,
      toolType: "link",
      LastRun: "2024-06-02 10:15:17",
    },
    {
      tool_id: 2001001,
      Tool_name: "ELK",
      BoxType: "Tools_b",
      headline: "Collected Artifacts and Results",
      isActive: false,
      ShowInUi: true,
      logoAddress_1: "./Logos/ELK.svg",
      logoAddress_2: "",
      iconAddress: "./icons/General-icons-b.svg",
      description_short: "Search and analyze all collected artifacts",
      description_long:
        "Elasticsearch is used for storing, searching, and analyzing structured and unstructured data in near real-time. All data gathered by the various RISX modules is stored and indexed using Elasticsearch, facilitating easy search and analysis",
      Status: "blue",
      buttonTitle: "View",
      toolURL: "https://10root.com/",
      ServicePackage: "Standard",
      threshold_time: 24,
      arguments: { tags: [] },
      useResourceType: "",
      positionNumber: 2,
      toolType: "link",
      LastRun: "2024-06-02 10:15:17",
    },
    {
      tool_id: 2001002,
      Tool_name: "TimeSketch",
      BoxType: "Tools_a",
      headline: "Forensics",
      isActive: false,
      ShowInUi: true,
      logoAddress_1: "./Logos/Timesketch.svg",
      logoAddress_2: "",
      iconAddress: "./icons/General-icons-e.svg",
      description_short: "Collaborative forensic timeline analysis",
      description_long:
        "Timesketch is an open-source collaborative tool designed for forensic timeline analysis, allowing users to organize and analyze timelines collectively. It enables the addition of annotations, comments, and tags to enhance the understanding of raw data",
      Status: "blue",
      buttonTitle: "Timelines",
      toolURL: "https://10root.com/",
      ServicePackage: "Standard",
      threshold_time: 24,
      arguments: { tags: [] },
      useResourceType: "2008",
      positionNumber: 1,
      toolType: "module",
      LastRun: "2024-06-02 10:15:17",
    },
    {
      tool_id: 2001003,
      Tool_name: "Open CTI",
      BoxType: "Tools_b",
      headline: "CTI DB & Dashboard",
      isActive: false,
      ShowInUi: false,
      logoAddress_1: "./Logos/OPENCTI.png",
      logoAddress_2: "",
      iconAddress: "./icons/General-icons-a.svg",
      description_short: "Cyber threat intelligence knowledge and observable",
      description_long:
        "OpenCTI is an open-source platform that enables organizations to manage their cyber threat intelligence by structuring, storing, and visualizing both technical and non-technical information about cyber threats",
      Status: "blue",
      buttonTitle: "Active",
      toolURL: "https://10root.com/",
      ServicePackage: "Standard",
      threshold_time: 24,
      arguments: { tags: [] },
      useResourceType: "",
      positionNumber: 3,
      toolType: "link",
      LastRun: "2024-06-02 10:15:17",
    },
    {
      tool_id: 2001004,
      Tool_name: "10Root Osint",
      BoxType: "Tools_b",
      headline: "OSINT Private Search",
      isActive: false,
      ShowInUi: false,
      logoAddress_1: "./Logos/10Root.svg",
      logoAddress_2: "",
      iconAddress: "./icons/General-icons-i.svg",
      description_short: "Multi custom OSINT search engine",
      description_long:
        "Open source intelligence (OSINT) is the collection and analysis of data gathered from open sources (covert sources and publicly available information; PAI) to produce actionable intelligence. OSINT is primarily used in national security, law enforcement, and business intelligence functions and is of value to analysts who use non-sensitive intelligence in answering classified, unclassified, or proprietary intelligence requirements across the previous intelligence disciplines",
      Status: "blue",
      buttonTitle: "Active",
      toolURL: "https://10root.com/",
      ServicePackage: "Standard",
      threshold_time: 24,
      arguments: { tags: [] },
      useResourceType: "2001,2002,2003,2004,2005,2006,2007",
      positionNumber: 4,
      toolType: "link",
      LastRun: "2024-06-02 10:15:17",
    },
    {
      tool_id: 2001010,
      Tool_name: "IRIS",
      BoxType: "Tools_b",
      headline: "IR Case Management",
      isActive: false,
      ShowInUi: true,
      logoAddress_1: "./Logos/Iris.png",
      logoAddress_2: "",
      iconAddress: "./icons/General-icons-h.svg",
      description_short: "Incident response platform",
      description_long:
        "IRIS is a collaborative platform for incident response analysts that helps to share investigations at a technical level",
      Status: "blue",
      buttonTitle: "Active",
      toolURL: "https://10root.com/",
      ServicePackage: "Standard",
      threshold_time: 24,
      arguments: { tags: [] },
      useResourceType: "",
      positionNumber: 9,
      toolType: "link",
      LastRun: "2024-06-02 10:15:17",
    },

    {
      tool_id: 2001005,
      Tool_name: "Nuclei",
      BoxType: "Tools_a",
      headline: "ASM",
      isActive: false,
      ShowInUi: true,
      logoAddress_1: "./Logos/Nuclei.svg",
      logoAddress_2: "",
      iconAddress: "./icons/General-icons-h.svg",
      description_short: "External assets vulnerability scan",
      description_long:
        "Nuclei is an open-source vulnerability scanner that uses customizable templates to perform fast and flexible security checks across various protocols, including HTTP, DNS, and TCP. It allows security professionals to automate the detection of potential vulnerabilities and misconfigurations in their infrastructure by leveraging a community-driven repository of templates",
      Status: "blue",
      buttonTitle: "Explore",
      toolURL: "https://10root.com/",
      ServicePackage: "Standard",
      threshold_time: 24,
      arguments: { tags: [] },
      useResourceType: "2001,2002",
      positionNumber: 6,
      toolType: "module",
      LastRun: "2024-06-02 10:15:17",
    },
    {
      tool_id: 2001006,
      Tool_name: "Strelka",
      BoxType: "Tools_b",
      headline: "Sandbox",
      isActive: false,
      ShowInUi: true,
      logoAddress_1: "./Logos/STRELKA.png",
      logoAddress_2: "",
      iconAddress: "./icons/General-icons-d.svg",
      description_short: "Examine files for malicious behavior",
      description_long:
        "The isolation metaphor is taken from the idea of children who do not play well together, so each is given his or her own sandbox to play in alone. It is often used to execute untested or untrusted programs or code, possibly from unverified or untrusted third parties, suppliers, users or websites, without risking harm to the host machine or operating system.[1] A sandbox typically provides a tightly controlled set of resources for guest programs to run in, such as storage and memory scratch space. Network access, the ability to inspect the host system, or read from input devices are usually disallowed or heavily restricted.In the sense of providing a highly controlled environment, sandboxes may be seen as a specific example of virtualization. Sandboxing is frequently used to test unverified programs that may contain a virus or other malicious code without allowing the software to harm the host device",
      Status: "blue",
      buttonTitle: "Active",
      toolURL: "https://10root.com/",
      ServicePackage: "Standard",
      threshold_time: 24,
      arguments: { tags: [] },
      useResourceType: "",
      positionNumber: 5,
      toolType: "link",
      LastRun: "2024-06-02 10:15:17",
    },
    // {
    //   tool_id: 2001007,
    //   Tool_name: "HashR",
    //   BoxType: "Tools_b",
    //   headline: "Private Hashes DB",
    //   isActive: false,
    //   ShowInUi: true,
    //   logoAddress_1: "./Logos/HashR.png",
    //   logoAddress_2: "",
    //   iconAddress: "",
    //   description_short: "Create custom hash sets from files",
    //   description_long:
    //     "The HashR team is pleased to announce the first public release of HashR. HashR extracts files from a source and uploads hashes, metadata and the actual content of the files to a given data sink. By doing that it allows you to generate your own hash sets, which then you can use during Blue Team operations, by extracting and hashing the actual files from complex data sources like physical or cloud disk images. There are many hash set providers out there (e.g. NSRL), but shared hash sets have some limitations",
    //   Status: "blue",
    //   buttonTitle: "Active",
    //   toolURL: "https://10root.com/",
    //   ServicePackage: "Standard",
    //   threshold_time: 24,
    //   arguments: {"tags":[]},
    //   useResourceType: "",
    //   positionNumber: 6,
    //   toolType: "link",
    //   LastRun: "2024-06-02 10:15:17",
    // },
    // {
    //   tool_id: 2001008,
    //   Tool_name: "Ail",
    //   BoxType: "Tools_b",
    //   headline: "Information Leak Framework",
    //   isActive: false,
    //   ShowInUi: true,
    //   logoAddress_1: "./Logos/ail.png",
    //   logoAddress_2: "",
    //   iconAddress: "",
    //   description_short: "Hunt darknet for leaked information",
    //   description_long:
    //     "AIL is a modular framework to analyse potential information leaks from unstructured data sources like pastes or social networks or unstructured data streams. The primary aim of the framework is to gather credentials, emails, credit-card numbers and so on in order to help security experts to detect leaks and then, react accordingly.The AIL training will show the various detection modules and how to use them as well as the web and tor crawler monitoring tool. Finally, the session will present how the framework can easily be extended to support new detection modules",
    //   Status: "blue",
    //   buttonTitle: "Active",
    //   toolURL: "https://10root.com/",
    //   ServicePackage: "Standard",
    //   threshold_time: 24,
    //   arguments: {"tags":[]},
    //   useResourceType: "2001,2002,2003,2004,2005,2006,2007",
    //   positionNumber: 7,
    //   toolType: "link",
    //   LastRun: "2024-06-02 10:15:17",
    // },
    {
      tool_id: 2001009,
      Tool_name: "Dehashed",
      BoxType: "Tools_b",
      headline: "CTI",
      isActive: false,
      ShowInUi: false,
      logoAddress_1: "./Logos/dehashed.svg",
      logoAddress_2: "",
      iconAddress: "",
      description_short: "Hunt for leak credential",
      description_long:
        "DeHashed is a comprehensive cybersecurity service designed to enhance personal security online. It offers real-time monitoring of hacker activity to prevent account compromise by utilizing a vast cyber intelligence dataset, aiding in identity fraud investigations. DeHashed prides itself on affordability, stating that security should be accessible to everyone without significant expense. It maintains exclusive access to new and private datasets, setting it apart from other services. The platform is trusted by thousands of law enforcement agencies and Fortune 500 companies globally for investigations and protection needs. Additionally, DeHashed features powerful API integrations, enabling users to incorporate its dataset into their own applications efficiently. For more details, please visit their website at DeHashed",
      Status: "blue",
      buttonTitle: "Explore",
      toolURL: "https://10root.com/",
      ServicePackage: "Premium",
      threshold_time: 24,
      arguments: { tags: [] },
      useResourceType: "2001,2002,2003,2004,2006,2007",
      positionNumber: 9,
      toolType: "module",
      LastRun: "2024-06-02 10:15:17",
    },
    {
      tool_id: 2001011,
      Tool_name: "Shodan",
      BoxType: "Tools_a",
      headline: "ASM",
      isActive: false,
      ShowInUi: true,
      logoAddress_1: "./Logos/Shodan.png",
      logoAddress_2: "",
      iconAddress: "./icons/General-icons-b.svg",
      description_short:
        "Map and gather info about internet-connected devices and systems",
      description_long:
        "Shodan is a search engine specifically designed to locate and index internet-connected devices, such as webcams, routers, and industrial control systems, by scanning for open ports and service banners",
      Status: "blue",
      buttonTitle: "Explore",
      toolURL: "https://10root.com/",
      ServicePackage: "Standard",
      threshold_time: 24,
      arguments: { tags: [] },
      useResourceType: "2001,2002",
      positionNumber: 7,
      toolType: "module",
      LastRun: "2024-06-02 10:15:17",
    },
    {
      tool_id: 2001012,
      Tool_name: "MISP",
      BoxType: "Tools_b",
      headline: "Threat Intelligence & IOCs Platform",
      isActive: false,
      ShowInUi: false,
      logoAddress_1: "./Logos/MISP.png",
      logoAddress_2: "",
      iconAddress: "",
      description_short: "Threat intelligence sharing platform",
      description_long:
        "The MISP (Malware Information Sharing Platform & Threat Sharing) project fosters collaborative threat intelligence sharing among cybersecurity professionals. Through its open-source platform, MISP enables organizations to share, store, and analyze threat data, enhancing their ability to detect and respond to cyber threats effectively",
      Status: "blue",
      buttonTitle: "Active",
      toolURL: "https://tenroot-misp.northeurope.cloudapp.azure.com/",
      ServicePackage: "Standard",
      threshold_time: 24,
      arguments: { tags: [] },
      useResourceType: "",
      positionNumber: 10,
      toolType: "link",
      LastRun: "2024-06-02 10:15:17",
    },
    {
      tool_id: 2001013,
      Tool_name: "LeakCheck",
      BoxType: "Tools_a",
      headline: "CTI",
      isActive: false,
      ShowInUi: true,
      logoAddress_1: "./Logos/LEAKCHECK.png",
      logoAddress_2: "",
      iconAddress: "./icons/General-icons-a.svg",
      description_short: "Identify and manage exposed credentials",
      description_long:
        "Scanning for exposed credentials and sensitive information",
      Status: "blue",
      buttonTitle: "Explore",
      toolURL: "https://leakcheck.io",
      ServicePackage: "Standard",
      threshold_time: 24,
      arguments: { tags: [] },
      useResourceType: "2001,2003,2004,2006",
      positionNumber: 8,
      toolType: "module",
      LastRun: "2024-06-02 10:15:17",
    },
    {
      tool_id: 2001014,
      Tool_name: "Nightingale",
      BoxType: "Tools_b",
      headline: "Penetration Testing",
      isActive: false,
      ShowInUi: true,
      logoAddress_1: "./Logos/Nightingale_Logo.png",
      logoAddress_2: "",
      iconAddress: "",
      description_short: "Pentesting Tools Collection",
      description_long: "",
      Status: "blue",
      buttonTitle: "Active",
      toolURL: "https://github.com/ccfos/nightingale",
      ServicePackage: "Standard",
      threshold_time: 24,
      arguments: { tags: [] },
      useResourceType: "",
      positionNumber: 11,
      toolType: "link",
      LastRun: "2024-06-02 10:15:17",
    },
    {
      tool_id: 2001015,
      Tool_name: "CyberChef",
      BoxType: "Tools_b",
      headline: "Penetration Testing",
      isActive: false,
      ShowInUi: true,
      logoAddress_1: "./Logos/cyberchef_logo.png",
      logoAddress_2: "",
      iconAddress: "",
      description_short: "The Cyber Swiss Army Knife",
      description_long:
        'CyberChef, developed by GCHQ, is a versatile web application known as "The Cyber Swiss Army Knife," designed to perform all kinds of "cyber" operations within a browser, including encoding, encryption, data analysis, and more, facilitating the exploration and manipulation of data without needing complex tools.',
      Status: "blue",
      buttonTitle: "Active",
      toolURL: "https://github.com/gchq/CyberChef",
      ServicePackage: "Standard",
      threshold_time: 24,
      arguments: { tags: [] },
      useResourceType: "",
      positionNumber: 12,
      toolType: "link",
      LastRun: "2024-06-02 10:15:17",
    },
    {
      tool_id: 2001016,
      Tool_name: "Prowler",
      BoxType: "Tools_b",
      headline: "Cloud",
      isActive: false,
      ShowInUi: true,
      logoAddress_1: "./Logos/Prowler.png",
      logoAddress_2: "",
      iconAddress: "",
      description_short: "Cloud Compliance and misconfiguration",
      description_long: `The Prowler app is a comprehensive security tool designed for cloud environments like AWS, Azure, and GCP, offering detailed audits, security assessments, and continuous monitoring, while supporting various compliance standards including CIS benchmarks and GDPR, making it ideal for organizations aiming to meet strict regulatory requirements and enhance infrastructure security through actionable insights and recommendations.
`,
      Status: "blue",
      buttonTitle: "Active",
      toolURL: "https://github.com/prowler-cloud/prowler",
      ServicePackage: "Standard",
      threshold_time: 24,
      arguments: { tags: [] },
      useResourceType: "",
      positionNumber: 13,
      toolType: "link",
      LastRun: "2024-06-02 10:15:17",
    },
    // {
    //   tool_id: 2001017,
    //   Tool_name: "Caldera",
    //   BoxType: "Tools_b",
    //   headline: "Penetration Testing",
    //   isActive: false,
    //   ShowInUi: true,
    //   logoAddress_1: "./Logos/Caldera.png",
    //   logoAddress_2: "",
    //   iconAddress: "",
    //   description_short: "cyber security platform",
    //   description_long: `MITRE Caldera™ is a cyber security platform designed to easily automate adversary emulation, assist manual red-teams, and automate incident response.`,
    //   Status: "blue",
    //   buttonTitle: "Active",
    //   toolURL: "https://github.com/mitre/caldera",
    //   ServicePackage: "Standard",
    //   threshold_time: 24,
    //   arguments: {"tags":[]},
    //   useResourceType: "",
    //   positionNumber: 12,
    //   toolType: "link",
    //   LastRun: "2024-06-02 10:15:17",
    // },
    {
      tool_id: 2001018,
      Tool_name: "AIVulnerability",
      BoxType: "Tools_b",
      headline: "ASM",
      isActive: false,
      ShowInUi: true,
      logoAddress_1: "./Logos/ChatGpt.png",
      logoAddress_2: "",
      iconAddress: "",
      description_short:
        "Locates all the cve relevant to the timeframe and products provided",
      description_long:
        "Locates all the cve relevant to the timeframe and products provided ",
      Status: "blue",
      buttonTitle: "Explore",
      toolURL: "https://chatgpt.com/?model=gpt-4o",
      ServicePackage: "Premium",
      threshold_time: 24,
      arguments: { tags: [] },
      useResourceType: "2001,2002,2003,2004,2006,2007",
      positionNumber: 9,
      toolType: "module",
      LastRun: "2024-06-02 10:15:17",
    },
    {
      tool_id: 2001019,
      Tool_name: "Kape",
      BoxType: "Tools_a",
      headline: "Kape Forensics",
      isActive: false,
      ShowInUi: false,
      logoAddress_1: "./Logos/kapeLogo.png.svg",
      logoAddress_2: "",
      iconAddress: "./icons/General-icons-e.svg",
      description_short: "Create KapeFiles",
      description_long:
        "Timesketch is an open-source collaborative tool designed for forensic timeline analysis, allowing users to organize and analyze timelines collectively. It enables the addition of annotations, comments, and tags to enhance the understanding of raw data",
      Status: "blue",
      buttonTitle: "View",
      toolURL: "https://10root.com/",
      ServicePackage: "Standard",
      threshold_time: 24,
      arguments: { tags: [] },
      useResourceType: "2008",
      positionNumber: 1,
      toolType: "module",
      LastRun: "2024-06-02 10:15:17",
    },
  ]);
};
