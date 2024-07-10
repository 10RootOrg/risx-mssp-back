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
      resource_type_name: 'Domain',
      description_short: 'Domain security: HTTPS, encryption, firewalls, VPNs, multi-factor authentication.',
      description_long: 'Cybersecurity in Domains can employ HTTPS, encryption, firewalls, VPNs, and multi-factor authentication for enhanced protection against cyber threats.',
      }, 
        {
        resource_type_id: 2002,
        resource_type_name: 'IP Address',
        description_short: 'IP addresses aid cybersecurity monitoring.',
        description_long: 'Cybersecurity professionals can leverage IP addresses for network monitoring and analysis, threat detection, and access control measures.',
        }, 
        {
          resource_type_id: 2003,
          resource_type_name: 'Username (Social)',
          description_short: 'Usernames are unique identifiers used to access accounts or systems.',
          description_long: 'redential theft, social engineering attacks, unauthorized access, identity spoofing, and phishing scams.',
          }, 
          {
            resource_type_id: 2004,
            resource_type_name: 'Phone Number',
            description_short: 'Risk in mobile phone numbers includes SIM swapping, phishing attacks, spamming, and identity theft..',
            description_long: 'Mobile phone numbers are susceptible to various risks, including SIM swapping, phishing attacks, identity theft, spam messages, unauthorized access, and location tracking..',
            }, 
            {
              resource_type_id: 2005,
              resource_type_name: 'Full Name',
              description_short: 'Ensuring the security of full names is vital for authentication.',
              description_long: 'Verifying full names ensures accurate identification, prevents impersonation, and strengthens overall security measures against unauthorized access and fraud',
              }, 
              {
                resource_type_id: 2006,
                resource_type_name: 'Email Addresss',
                description_short: 'Authenticate users and prevent phishing and email-based attacks.',
                description_long: 'Email addresses serve as crucial identifiers in cybersecurity, used to authenticate users identities and facilitate secure communication within digital environments. Ensuring their validity and security helps prevent various email-based threats, including phishing attacks aimed at stealing sensitive information or spreading malware. By verifying and safeguarding email addresses, organizations can enhance their overall cybersecurity posture and protect against potential breaches and unauthorized access.',
                }, 
                {
                  resource_type_id: 2007,
                  resource_type_name: 'Company Name',
                  description_short: 'verify business legitimacy and ensure secure business interactions.',
                  description_long: 'The "Company Name" resource type enables users to verify the legitimacy of businesses and ensures secure interactions. This resource type provides comprehensive details and background information about companies, including their history, operational scope, financial health, and regulatory compliance. It serves as a vital tool for making informed decisions in business partnerships, investments, and transactions, fostering trust and confidence in business relationships.'
                  },{
                    resource_type_id: 2008,
                    resource_type_name: 'Computer',
                    description_short: 'Essential for safeguarding data, preventing breaches, ensuring network security.',
                    description_long: 'The "Computer" IS crucial, preventing breaches, and ensuring network integrity through robust encryption and stringent access controls.'
                    }, 

  ]);
};




// OSINT, AIL,

// Email Address

// OSINT, AIL, Dehashed

// Company Name