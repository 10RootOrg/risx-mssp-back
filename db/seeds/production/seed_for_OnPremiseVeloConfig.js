/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("on_premise_velociraptor").del();
  await knex("on_premise_velociraptor").insert([
    {
      config_name: "Lite",
      description: "Quick Short and Very Informative Velociraptor Config",
      config: JSON.stringify({
        Artifacts: [
          {
            name: "Custom.Windows.DensityScout",
            parameters: { RecursiveRun: false, FileSuffix: "exe,cpl,dll,kkk" },
          },
          {
            name: "Custom.Windows.GoldFinger.TGT.Analyzer",
            parameters: {},
          },
        ],
        Resources: {
          CpuLimit: 30,
          MaxExecutionTimeInSeconds: 600,
          MaxIdleTimeInSeconds: 600,
        },
        Configuration: {
          EncryptionScheme: "None",
          EncryptionSchemeValue: "",
          CollectorFileName: "Collector-Lite",
          OutputsFileName: "Collector-Lite-Outputs-%FQDN%-%TIMESTAMP%",
        },
      }),
    },
    {
      config_name: "Full",
      description: "Full Scan To The Agent Velociraptor Config",
      config: JSON.stringify({
        Artifacts: [
          {
            name: "Custom.Windows.DensityScout",
            parameters: {},
          },
          {
            name: "Custom.Windows.GoldFinger.TGT.Analyzer",
            parameters: {},
          },
        ],
        Resources: {
          CpuLimit: 30,
          MaxExecutionTimeInSeconds: 600,
          MaxIdleTimeInSeconds: 600,
        },
        Configuration: {
          EncryptionScheme: "None",
          EncryptionSchemeValue: "",
          CollectorFileName: "Collector-Full",
          OutputsFileName: "Collector-Full-Outputs-%FQDN%-%TIMESTAMP%",
        },
      }),
    },
  ]);
};
