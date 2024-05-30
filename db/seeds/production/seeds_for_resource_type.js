/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('resource_type').del()
  await knex('resource_type').insert([
    {
      resource_type_id: 2001,
      resource_type_name: 'URL',
      description_short: 'URL security: HTTPS, encryption, firewalls, VPNs, multi-factor authentication.',
      description_long: 'Cybersecurity in URLs can employ HTTPS, encryption, firewalls, VPNs, and multi-factor authentication for enhanced protection against cyber threats.',
      }, 
        {
        resource_type_id: 2002,
        resource_type_name: 'IP Address',
        description_short: 'IP addresses aid cybersecurity monitoring.',
        description_long: 'Cybersecurity professionals can leverage IP addresses for network monitoring and analysis, threat detection, and access control measures.',
        }, 
        {
          resource_type_id: 2003,
          resource_type_name: 'User Name',
          description_short: 'Usernames are unique identifiers used to access accounts or systems.',
          description_long: 'redential theft, social engineering attacks, unauthorized access, identity spoofing, and phishing scams.',
          }, 
          {
            resource_type_id: 2004,
            resource_type_name: 'Phone Number',
            description_short: 'Risk in mobile phone numbers includes SIM swapping, phishing attacks, spamming, and identity theft..',
            description_long: 'Mobile phone numbers are susceptible to various risks, including SIM swapping, phishing attacks, identity theft, spam messages, unauthorized access, and location tracking..',
            }, 
  ]);
};
