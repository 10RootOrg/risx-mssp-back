/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("artifacts").del();
  await knex("artifacts").insert([
    // parent_id
    {
      BoxType: "Tools_big",
      headline: "Threat Hunting",
      description:
        "OS compliance check for Windows OS against 40 different baselines",
      Toolname: "HardeningKitty",
      artifact_id: "1000103",
      parent_id: "2000000",
      readMoreText:
        "HardeningKitty supports hardening of a Windows system. The configuration of the system is retrieved and assessed using a finding list. In addition, the system can be hardened according to predefined values. HardeningKitty reads settings from the registry and uses other modules to read configurations outside the registry.The script was developed for English systems",
      isActive: false,
      ShowInUi: true,
      logoAddress_1: "./Logos/Kitty.svg",
      toolURL: "Threat Hunting",
      readMoreAddress: "",
      buttonTitle: "View",
      Status: "blue",
      ServicePackage: "",
      threshold_time: 24,
      arguments: { tags: [] },
      useResourceType: "",
      positionNumber: 2,
      LastRun: "2024-06-02 10:15:17",
    },

    {
      BoxType: "Tools_big",
      headline: "Threat Hunting",
      description:
        "Incident Responders and System Administrators to hunt persistences implanted",
      Toolname: "PersistenceSniper",
      artifact_id: "1000104",
      parent_id: "2000000",
      readMoreText:
        "PersistenceSniper is a Powershell module that can be used by Blue Teams, Incident Responders and System Administrators to hunt persistences implanted in Windows machines. It is also available on Powershell Gallery and it is digitally signed with a valid code signing certificate. The tool is under active development with new releases coming out by the week, so make sure to use the up-to-date version",
      isActive: false,
      ShowInUi: true,
      logoAddress_1: "./Logos/PersistenceSniper.png",
      toolURL: "Threat Hunting",
      readMoreAddress: "",
      buttonTitle: "View",
      Status: "blue",
      ServicePackage: "",
      threshold_time: 24,
      arguments: { tags: [] },
      useResourceType: "",
      positionNumber: 3,
      LastRun: "2024-06-02 10:15:17",
    },
    {
      BoxType: "Tools_big",
      headline: "Threat Hunting",
      description: "Event log fast forensics timeline generator",
      Toolname: "Hayabusa",
      artifact_id: "1000105",
      parent_id: "2000000",
      readMoreText:
        "Hayabusa currently has over 4000 Sigma rules and over 170 Hayabusa built-in detection rules with more rules being added regularly. It can be used for enterprise-wide proactive threat hunting as well as DFIR (Digital Forensics and Incident Response) for free with Velociraptor's Hayabusa artifact. By combining these two open-source tools, you can essentially retroactively reproduce a SIEM when there is no SIEM setup in the environment. You can learn about how to do this by watching Eric Capuano's Velociraptor walkthrough",
      isActive: false,
      ShowInUi: true,
      logoAddress_1: "./Logos/hayabusa.png",
      toolURL: "Threat Hunting",
      readMoreAddress: "",
      buttonTitle: "View",
      Status: "blue",
      ServicePackage: "",
      threshold_time: 24,
      arguments: { tags: [] },
      useResourceType: "",
      positionNumber: 4,
      LastRun: "2024-06-02 10:15:17",
    },
    {
      BoxType: "Tools_big",
      headline: "All Around",
      description: "Optimal digital forensics with expert-selected artifacts",
      Toolname: "BestPractice",
      artifact_id: "1000106",
      parent_id: "2000000",
      readMoreText:
        "Our curated collection of Velociraptor artifacts represents the pinnacle of forensic investigation tools as recommended by our industry professionals. These artifacts are meticulously selected to ensure comprehensive and efficient digital forensics and cybersecurity investigations. By leveraging these best practice artifacts, you can enhance your capability to detect, analyze, and respond to security incidents with precision and speed",
      isActive: false,
      ShowInUi: true,
      logoAddress_1: "./Logos/BestPractice.svg",
      toolURL: "All Around",
      readMoreAddress: "",
      buttonTitle: "View",
      Status: "blue",
      ServicePackage: "",
      threshold_time: 24,
      arguments: { tags: [] },
      useResourceType: "",
      positionNumber: 5,
      LastRun: "2024-06-02 10:15:17",
    },
  ]);
};
