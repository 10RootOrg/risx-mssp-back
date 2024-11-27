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
      config_name: "Best-Practice",
      description: "Best of Breed Artifacts as recommended by 10Root",
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
          CollectorFileName: "Collector-Best-Practice",
          OutputsFileName: "Collector-Best-Practice-Outputs-%FQDN%-%TIMESTAMP%",
        },
      }),
    },
  ]);
};
