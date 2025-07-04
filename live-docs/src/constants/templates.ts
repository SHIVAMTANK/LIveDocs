export const templates = [
  {
    id: "blank",
    label: "Blank Document",
    imageUrl: "/blank-document.svg",
    initialContent: "",
  },
  {
    id: "software-proposal",
    label: "Software Development Proposal",
    imageUrl: "/software-proposal.svg",
    initialContent: `
      <div className="document-content">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Software Development Proposal</h1>
          <div className="text-gray-600">
            <p><strong>Client:</strong> [Client Name]</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Prepared by:</strong> [Your Company Name]</p>
          </div>
        </header>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">Executive Summary</h2>
          <p className="text-gray-700 leading-relaxed">
            We are pleased to present this comprehensive software development proposal for <strong>[Project Name]</strong>. 
            Our team brings extensive experience in modern web technologies and agile development methodologies to deliver 
            a robust, scalable solution that meets your business objectives.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">Project Scope</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-medium text-gray-800 mb-3">Core Features</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <div>
                  <strong>User Authentication & Authorization</strong>
                  <ul className="ml-4 mt-1 text-gray-600">
                    <li>• Secure login/logout functionality</li>
                    <li>• Role-based access control</li>
                    <li>• Password reset capabilities</li>
                  </ul>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <div>
                  <strong>Dashboard & Analytics</strong>
                  <ul className="ml-4 mt-1 text-gray-600">
                    <li>• Real-time data visualization</li>
                    <li>• Custom reporting tools</li>
                    <li>• Performance metrics tracking</li>
                  </ul>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <div>
                  <strong>Data Management</strong>
                  <ul className="ml-4 mt-1 text-gray-600">
                    <li>• CRUD operations for core entities</li>
                    <li>• Data import/export functionality</li>
                    <li>• Automated backup systems</li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-medium text-gray-800 mb-3">Technical Specifications</h3>
            <div className="grid grid-cols-2 gap-4 text-gray-700">
              <div><strong>Frontend:</strong> React.js with TypeScript</div>
              <div><strong>Backend:</strong> Node.js with Express</div>
              <div><strong>Database:</strong> PostgreSQL</div>
              <div><strong>Cloud:</strong> AWS/Vercel</div>
              <div><strong>Authentication:</strong> NextAuth.js</div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">Timeline & Milestones</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Phase</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Duration</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Deliverables</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Planning & Design</td>
                  <td className="border border-gray-300 px-4 py-2">2 weeks</td>
                  <td className="border border-gray-300 px-4 py-2">Wireframes, Technical Architecture</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Development Phase 1</td>
                  <td className="border border-gray-300 px-4 py-2">4 weeks</td>
                  <td className="border border-gray-300 px-4 py-2">Core Features Implementation</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Development Phase 2</td>
                  <td className="border border-gray-300 px-4 py-2">3 weeks</td>
                  <td className="border border-gray-300 px-4 py-2">Advanced Features & Integration</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Testing & Deployment</td>
                  <td className="border border-gray-300 px-4 py-2">1 week</td>
                  <td className="border border-gray-300 px-4 py-2">Quality Assurance & Go-Live</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-lg font-medium text-gray-800">
            <strong>Total Project Duration:</strong> 10 weeks
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">Investment</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Development:</span>
                <span className="font-medium">$[Amount]</span>
              </div>
              <div className="flex justify-between">
                <span>Testing & QA:</span>
                <span className="font-medium">$[Amount]</span>
              </div>
              <div className="flex justify-between">
                <span>Deployment & Setup:</span>
                <span className="font-medium">$[Amount]</span>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between text-lg font-bold text-gray-800">
                <span>Total:</span>
                <span>$[Total Amount]</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">Next Steps</h2>
          <ol className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">1</span>
              Review and approve this proposal
            </li>
            <li className="flex items-start">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">2</span>
              Sign development agreement
            </li>
            <li className="flex items-start">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">3</span>
              Initial payment and project kickoff
            </li>
            <li className="flex items-start">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">4</span>
              Begin discovery and planning phase
            </li>
          </ol>
        </section>

        <footer className="text-center text-gray-500 text-sm border-t pt-4">
          <p><em>This proposal is valid for 30 days from the date above.</em></p>
        </footer>
      </div>
    `,
  },
  {
    id: "project-proposal",
    label: "Project Proposal",
    imageUrl: "/project-proposal.svg",
    initialContent: `
      <div className="document-content">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Project Proposal</h1>
          <h2 className="text-xl text-gray-600 mb-4">[Insert Project Title Here]</h2>
          <div className="text-gray-600 space-y-1">
            <p><strong>Submitted to:</strong> [Client/Organization Name]</p>
            <p><strong>Submitted by:</strong> [Your Name/Organization]</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
        </header>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-green-500 pb-2">Executive Summary</h2>
          <p className="text-gray-700 leading-relaxed">
            This proposal outlines <strong>[brief description of the project]</strong> designed to <strong>[main objective/goal]</strong>. 
            The project will deliver <strong>[key outcomes]</strong> within <strong>[timeframe]</strong> and budget of <strong>[amount]</strong>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-green-500 pb-2">Problem Statement</h2>
          <p className="text-gray-700 leading-relaxed">
            [Describe the current situation, challenges, or opportunities that this project will address. 
            Be specific about the pain points and their impact.]
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-green-500 pb-2">Proposed Solution</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our proposed solution involves <strong>[detailed description of your approach]</strong>. This will be achieved through:
          </p>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">1. [Component 1]</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Description of what this involves</li>
                <li>• Expected outcomes</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">2. [Component 2]</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Description of what this involves</li>
                <li>• Expected outcomes</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 mb-2">3. [Component 3]</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Description of what this involves</li>
                <li>• Expected outcomes</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-green-500 pb-2">Project Objectives</h2>
          <div className="bg-green-50 p-6 rounded-lg">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Primary Goal:</h3>
              <p className="text-gray-700">[Main objective]</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Secondary Goals:</h3>
              <ul className="text-gray-700 space-y-1">
                <li>• [Objective 1]</li>
                <li>• [Objective 2]</li>
                <li>• [Objective 3]</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-green-500 pb-2">Timeline</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Milestone</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Duration</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Completion Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Project Initiation</td>
                  <td className="border border-gray-300 px-4 py-2">[Duration]</td>
                  <td className="border border-gray-300 px-4 py-2">[Date]</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Phase 1 Completion</td>
                  <td className="border border-gray-300 px-4 py-2">[Duration]</td>
                  <td className="border border-gray-300 px-4 py-2">[Date]</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Phase 2 Completion</td>
                  <td className="border border-gray-300 px-4 py-2">[Duration]</td>
                  <td className="border border-gray-300 px-4 py-2">[Date]</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Final Delivery</td>
                  <td className="border border-gray-300 px-4 py-2">[Duration]</td>
                  <td className="border border-gray-300 px-4 py-2">[Date]</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-green-500 pb-2">Expected Outcomes</h2>
          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-gray-700 mb-3">Upon completion, this project will deliver:</p>
            <ul className="text-gray-700 space-y-2">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                [Outcome 1]
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                [Outcome 2]
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">✓</span>
                [Outcome 3]
              </li>
            </ul>
          </div>
        </section>

        <footer className="text-center border-t pt-6">
          <p className="text-gray-700 mb-4">
            We are confident that this project will [summarize key benefits]. We look forward to discussing this proposal further.
          </p>
          <div className="text-gray-600">
            <p><strong>Contact Information:</strong></p>
            <p>[Your Name] | [Your Title]</p>
            <p>[Email Address] | [Phone Number]</p>
          </div>
        </footer>
      </div>
    `,
  },
  {
    id: "business-letter",
    label: "Business Letter",
    imageUrl: "/business-letter.svg",
    initialContent: `
      <div className="document-content max-w-2xl">
        <div className="mb-8">
          <div className="text-gray-700 space-y-1">
            <p>[Your Name]</p>
            <p>[Your Title]</p>
            <p>[Your Company]</p>
            <p>[Your Address]</p>
            <p>[City, State ZIP Code]</p>
            <p>[Your Email]</p>
            <p>[Your Phone Number]</p>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-gray-700">${new Date().toLocaleDateString()}</p>
        </div>

        <div className="mb-8">
          <div className="text-gray-700 space-y-1">
            <p>[Recipient's Name]</p>
            <p>[Recipient's Title]</p>
            <p>[Company Name]</p>
            <p>[Company Address]</p>
            <p>[City, State ZIP Code]</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-700">Dear [Mr./Ms./Dr.] [Recipient's Last Name],</p>
        </div>

        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            I am writing to <strong>[state the purpose of your letter clearly and concisely]</strong>. 
            [Provide context or background information if necessary].
          </p>

          <p>
            [In the body paragraphs, elaborate on your main points. Use clear, professional language and 
            organize your thoughts logically. Each paragraph should focus on a single main idea.]
          </p>

          <p>
            [Second paragraph: Provide additional details, supporting information, or specific examples 
            that reinforce your main message.]
          </p>

          <p>
            [Third paragraph: If applicable, mention any next steps, requests for action, or how you 
            plan to follow up.]
          </p>

          <p>
            I would appreciate the opportunity to [discuss this matter further/schedule a meeting/receive your feedback]. 
            Please feel free to contact me at <strong>[your phone number]</strong> or <strong>[your email address]</strong> 
            if you have any questions or need additional information.
          </p>

          <p>
            Thank you for your time and consideration. I look forward to hearing from you soon.
          </p>
        </div>

        <div className="mt-8 mb-16">
          <p className="text-gray-700">Sincerely,</p>
        </div>

        <div className="text-gray-700 space-y-1">
          <p>[Your Handwritten Signature]</p>
          <p><strong>[Your Typed Name]</strong></p>
          <p>[Your Title]</p>
        </div>

        <div className="mt-8 text-gray-600 text-sm space-y-1">
          <p><strong>Enclosures:</strong> [List any documents you're including]</p>
          <p><strong>cc:</strong> [List anyone else receiving a copy]</p>
        </div>
      </div>
    `,
  },
  {
    id: "resume",
    label: "Resume",
    imageUrl: "/resume.svg",
    initialContent: `
      <div className="document-content">
        <header className="text-center mb-8 pb-6 border-b-2 border-blue-500">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">[Your Full Name]</h1>
          <h2 className="text-xl text-gray-600 mb-4">[Your Professional Title]</h2>
          <div className="flex flex-wrap justify-center gap-4 text-gray-600">
            <span>📧 [your.email@example.com]</span>
            <span>📱 [Your Phone Number]</span>
            <span>🌐 [LinkedIn Profile]</span>
            <span>💼 [Portfolio Website]</span>
            <span>📍 [City, State]</span>
          </div>
        </header>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">
            Dynamic and results-driven <strong>[Your Profession]</strong> with <strong>[X] years</strong> of experience in 
            <strong>[relevant field/industry]</strong>. Proven track record of <strong>[key achievement or skill]</strong>. 
            Passionate about <strong>[relevant interest]</strong> and committed to delivering high-quality results in fast-paced environments.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">Core Competencies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Technical Skills:</h3>
              <p className="text-gray-700">[Skill 1] • [Skill 2] • [Skill 3] • [Skill 4]</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Software Proficiency:</h3>
              <p className="text-gray-700">[Software 1] • [Software 2] • [Software 3]</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Languages:</h3>
              <p className="text-gray-700">[Language 1] (Native) • [Language 2] (Fluent)</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Certifications:</h3>
              <p className="text-gray-700">[Certification 1] • [Certification 2]</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">Professional Experience</h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-medium text-gray-800">[Job Title]</h3>
                  <p className="text-lg text-blue-600 font-medium">[Company Name]</p>
                </div>
                <div className="text-right text-gray-600">
                  <p className="font-medium">[Start Date] - [End Date/Present]</p>
                  <p>[Location]</p>
                </div>
              </div>
              <ul className="text-gray-700 space-y-2">
                <li>• [Achievement-focused bullet point with quantifiable results]</li>
                <li>• [Another accomplishment that demonstrates your impact]</li>
                <li>• [Third bullet point showing relevant skills or responsibilities]</li>
                <li>• [Fourth point highlighting leadership or collaboration]</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-medium text-gray-800">[Previous Job Title]</h3>
                  <p className="text-lg text-blue-600 font-medium">[Previous Company Name]</p>
                </div>
                <div className="text-right text-gray-600">
                  <p className="font-medium">[Start Date] - [End Date]</p>
                  <p>[Location]</p>
                </div>
              </div>
              <ul className="text-gray-700 space-y-2">
                <li>• [Achievement-focused bullet point with quantifiable results]</li>
                <li>• [Another accomplishment that demonstrates your impact]</li>
                <li>• [Third bullet point showing relevant skills or responsibilities]</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">Education</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-800">[Degree Type] in [Field of Study]</h3>
              <p className="text-blue-600 font-medium">[University Name] | [Graduation Year]</p>
              <p className="text-gray-600 italic">[Relevant coursework, honors, or GPA if impressive]</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800">[Additional Degree/Certification]</h3>
              <p className="text-blue-600 font-medium">[Institution Name] | [Year]</p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">Key Projects</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-medium text-gray-800">[Project Name]</h3>
              <p className="text-gray-700 mb-2">[Brief description of the project and your role]</p>
              <div className="text-gray-600">
                <p><strong>Technologies Used:</strong> [List relevant technologies]</p>
                <p><strong>Key Achievement:</strong> [Quantifiable result or impact]</p>
              </div>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-medium text-gray-800">[Another Project Name]</h3>
              <p className="text-gray-700 mb-2">[Brief description of the project and your role]</p>
              <div className="text-gray-600">
                <p><strong>Technologies Used:</strong> [List relevant technologies]</p>
                <p><strong>Key Achievement:</strong> [Quantifiable result or impact]</p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">Awards & Recognition</h2>
            <ul className="text-gray-700 space-y-2">
              <li>• <strong>[Award Name]</strong> - [Organization] ([Year])</li>
              <li>• <strong>[Recognition]</strong> - [Context] ([Year])</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">Professional Associations</h2>
            <ul className="text-gray-700 space-y-2">
              <li>• Member, [Professional Organization] ([Year] - Present)</li>
              <li>• [Role], [Another Organization] ([Year] - [Year])</li>
            </ul>
          </section>
        </div>

        <footer className="text-center text-gray-500 text-sm mt-8 pt-4 border-t">
          <p><em>References available upon request</em></p>
        </footer>
      </div>
    `,
  },
  {
    id: "cover-letter",
    label: "Cover Letter",
    imageUrl: "/cover-letter.svg",
    initialContent: `
      <div className="document-content max-w-2xl">
        <div className="mb-8">
          <div className="text-gray-700 space-y-1">
            <p>[Your Name]</p>
            <p>[Your Address]</p>
            <p>[City, State ZIP Code]</p>
            <p>[Your Email Address]</p>
            <p>[Your Phone Number]</p>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-gray-700">${new Date().toLocaleDateString()}</p>
        </div>

        <div className="mb-8">
          <div className="text-gray-700 space-y-1">
            <p>[Hiring Manager's Name]</p>
            <p>[Title]</p>
            <p>[Company Name]</p>
            <p>[Company Address]</p>
            <p>[City, State ZIP Code]</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-700">Dear Hiring Manager,</p>
        </div>

        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            I am writing to express my strong interest in the <strong>[Position Title]</strong> role at 
            <strong>[Company Name]</strong>. With my <strong>[relevant experience/background]</strong> and passion for 
            <strong>[relevant field/industry]</strong>, I am excited about the opportunity to contribute to your team 
            and help <strong>[Company Name]</strong> achieve its goals.
          </p>

          <p>
            In my previous role as <strong>[Previous Position]</strong> at <strong>[Previous Company]</strong>, I successfully 
            <strong>[specific achievement or responsibility that relates to the job you're applying for]</strong>. 
            This experience has equipped me with <strong>[relevant skills]</strong> that directly align with the 
            requirements outlined in your job posting. For example:
          </p>

          <div className="bg-blue-50 p-4 rounded-lg my-4">
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                [Specific example of how your experience matches a job requirement]
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                [Another relevant achievement or skill with quantifiable results if possible]
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                [Third point that demonstrates your value proposition]
              </li>
            </ul>
          </div>

          <p>
            What particularly attracts me to <strong>[Company Name]</strong> is <strong>[specific reason related to the 
            company's mission, values, recent news, or industry position]</strong>. I am impressed by 
            <strong>[specific company achievement, project, or value]</strong>, and I believe my background in 
            <strong>[relevant area]</strong> would allow me to make meaningful contributions to 
            <strong>[specific team/department/project]</strong>.
          </p>

          <p>
            I am particularly excited about the opportunity to <strong>[mention something specific about the role that 
            interests you]</strong> and to work with a team that <strong>[reference something you know about the company 
            culture or team]</strong>. My experience with <strong>[relevant skill/technology/process]</strong> and my 
            ability to <strong>[relevant soft skill]</strong> would enable me to <strong>[specific contribution you could make]</strong>.
          </p>

          <p>
            I would welcome the opportunity to discuss how my skills and enthusiasm can benefit <strong>[Company Name]</strong>. 
            Thank you for considering my application. I look forward to hearing from you soon.
          </p>
        </div>

        <div className="mt-8 mb-16">
          <p className="text-gray-700">Sincerely,</p>
        </div>

        <div className="text-gray-700 space-y-1">
          <p>[Your Handwritten Signature]</p>
          <p><strong>[Your Typed Name]</strong></p>
        </div>

        <div className="mt-8 text-gray-600 text-sm">
          <p><strong>Attachments:</strong> Resume, Portfolio (if applicable)</p>
        </div>
      </div>
    `,
  },
  {
    id: "letter",
    label: "Personal Letter",
    imageUrl: "/letter.svg",
    initialContent: `
      <div className="document-content max-w-2xl">
        <div className="mb-8">
          <div className="text-gray-700 space-y-1">
            <p>[Your Address]</p>
            <p>[City, State ZIP Code]</p>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-gray-700">${new Date().toLocaleDateString()}</p>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 text-lg">Dear [Recipient's Name],</p>
        </div>

        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            I hope this letter finds you in good health and high spirits. I am writing to 
            <strong>[state the purpose of your letter - whether it's to catch up, share news, express gratitude, etc.]</strong>
          </p>

          <p>
            [First paragraph: Share your main message or news. This could be personal updates, expressing feelings, 
            or the primary reason for writing.]
          </p>

          <p>
            [Second paragraph: Elaborate on your thoughts, share more details, or ask questions about the recipient's life. 
            Make it personal and engaging.]
          </p>

          <p>
            [Third paragraph: If applicable, mention future plans, extend invitations, or discuss shared memories or interests.]
          </p>

          <p>
            I would love to hear from you soon and learn about what's been happening in your life. 
            Please don't hesitate to reach out whenever you have a moment.
          </p>

          <p>
            [Closing sentiment - could be expressing anticipation for their response, sending well wishes, etc.]
          </p>
        </div>

        <div className="mt-8 mb-16">
          <p className="text-gray-700">With warm regards,</p>
        </div>

        <div className="text-gray-700 space-y-1">
          <p>[Your Signature]</p>
          <p><strong>[Your Name]</strong></p>
        </div>

        <div className="mt-8 text-gray-600 text-sm">
          <p><strong>P.S.</strong> [Optional postscript for any additional thoughts or casual remarks]</p>
        </div>
      </div>
    `,
  },
]
