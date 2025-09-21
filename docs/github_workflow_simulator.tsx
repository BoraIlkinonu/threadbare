import React, { useState } from 'react';
import { ChevronRight, Users, GitBranch, Download, Mail, Key, Github, Gamepad2, Globe, Smartphone, AlertTriangle, CheckCircle, XCircle, ArrowRight, Code, Terminal } from 'lucide-react';

const GitHubWorkflowSimulator = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [simulationState, setSimulationState] = useState({});

  const platforms = {
    github: { icon: Github, label: 'GitHub Web', color: 'bg-gray-800' },
    godot: { icon: Gamepad2, label: 'Godot', color: 'bg-blue-600' },
    endless: { icon: Smartphone, label: 'Endless Platform', color: 'bg-purple-600' },
    email: { icon: Mail, label: 'Email', color: 'bg-green-600' }
  };

  const PlatformBadge = ({ platform }) => {
    const Platform = platforms[platform];
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-white text-xs ${Platform.color}`}>
        <Platform.icon size={12} />
        {Platform.label}
      </span>
    );
  };

  const getStudentWorkflow = () => {
    const baseSteps = [
      // Phase 1: Account Setup
      {
        id: 'github-signup',
        title: 'Create GitHub Account',
        platform: 'github',
        type: 'info-with-friction',
        content: 'You need to manually create a GitHub account at github.com. GitHub prohibits automated account creation.',
        details: 'Required: valid email, unique username, secure password. You may encounter CAPTCHA, email verification, or username conflicts.',
        frictionPoints: ['Email verification required', 'CAPTCHA may appear', 'Popular usernames might be taken', 'Password strength requirements']
      },
      {
        id: 'github-account-created',
        title: 'GitHub Account Created',
        platform: 'github',
        type: 'info',
        content: 'Your GitHub account is now active and verified.'
      },
      {
        id: 'endless-sso',
        title: 'Sign in to Endless Platform',
        platform: 'endless',
        type: 'info',
        content: 'Navigate to the Endless Platform and click "Sign in with GitHub". You\'ll be redirected to GitHub for OAuth authentication.',
        details: 'You can only access Endless Platform after creating your GitHub account first.'
      },
      {
        id: 'endless-authenticated',
        title: 'Endless Platform Access Granted',
        platform: 'endless',
        type: 'info',
        content: 'You\'re now signed into Endless Platform using your GitHub credentials.'
      },
      {
        id: 'download-bundle',
        title: 'Download Explorer Bundle',
        platform: 'endless',
        type: 'info',
        content: 'Click "Explorer Program - Godot Bundle" button. The OS-specific installer (MSI for Windows, DMG for macOS) downloads automatically.'
      },
      {
        id: 'install-bundle',
        title: 'Install Software Bundle',
        platform: 'endless',
        type: 'info',
        content: 'The installer runs automatically: Git installs silently (/SILENT argument), Godot extracts with pre-configured settings including GitHub connectivity plugins.',
        details: 'Godot opens automatically with the Template project loaded.'
      },
      // Phase 2: Repository Access
      {
        id: 'receive-invitation',
        title: 'Receive Repository Invitation',
        platform: 'email',
        type: 'info',
        content: 'You receive an email: "teacher-username invited you to collaborate on team-alpha-godot-project".'
      },
      {
        id: 'accept-invitation',
        title: 'Accept Repository Invitation',
        platform: 'github',
        type: 'info',
        content: 'Click "View invitation" in email → GitHub opens → Yellow banner: "You\'ve been invited to collaborate" → Click "Accept invitation".',
        details: 'You now have Write access to your team repository.'
      },
      // Phase 3: Authentication Choice
      {
        id: 'choose-auth-method',
        title: 'Choose Authentication Method',
        platform: 'godot',
        type: 'choice',
        content: 'To download LFS files, you need to authenticate with GitHub. Choose your preferred method:',
        choices: [
          {
            id: 'personal-token',
            title: 'Personal Access Token (Manual)',
            description: 'Generate token manually in GitHub settings',
            icon: Key
          },
          {
            id: 'github-cli',
            title: 'GitHub CLI (Automated)',
            description: 'Device code flow with automatic setup',
            icon: Terminal
          }
        ]
      }
    ];

    const personalTokenSteps = [
      {
        id: 'token-setup',
        title: 'Generate Personal Access Token',
        platform: 'github',
        type: 'info',
        content: 'Navigate to GitHub Settings → Developer Settings → Personal Access Tokens → Generate new Token (classic)',
        details: 'Note: "EP-Godot", Expiration: "No Expiration", Permissions: Check "repo" (includes all repository permissions)',
        warning: 'CRITICAL: Copy the token immediately - it won\'t be displayed again!'
      },
      {
        id: 'token-generated',
        title: 'Token Generated',
        platform: 'github',
        type: 'info',
        content: 'Token created successfully. Keep the browser tab open until you use it in Godot.',
        details: 'If you lose this token, you\'ll need to generate a new one.'
      },
      {
        id: 'token-godot-setup',
        title: 'Configure Token in Godot',
        platform: 'godot',
        type: 'info',
        content: 'Open the "Endless Project Setup" plugin → Paste your Personal Access Token in the authentication field.'
      }
    ];

    const githubCliSteps = [
      {
        id: 'cli-setup',
        title: 'GitHub CLI Authentication Initiated',
        platform: 'godot',
        type: 'info',
        content: 'Godot triggers GitHub CLI with node-pty integration. A device registration code appears.'
      },
      {
        id: 'cli-device-code',
        title: 'Device Code Display',
        platform: 'godot',
        type: 'info',
        content: 'Pop-up shows 4×4 digit code with automatic clipboard copy. Click "Open Browser" to launch GitHub authentication page.'
      },
      {
        id: 'cli-browser-auth',
        title: 'Browser Authentication',
        platform: 'github',
        type: 'info',
        content: 'GitHub opens → Log in (or confirm existing login) → Paste the copied code → Click "Authorize".'
      },
      {
        id: 'cli-completion',
        title: 'CLI Authentication Complete',
        platform: 'godot',
        type: 'info',
        content: 'Close browser and return to Godot. Token is automatically retrieved and configured.'
      }
    ];

    const finalSteps = [
      {
        id: 'project-download',
        title: 'Download Team Project',
        platform: 'godot',
        type: 'info',
        content: 'Paste your team repository link into "Your project link" text box → Click "Download Project".',
        details: 'The complete project downloads with all LFS files using your authentication.'
      },
      {
        id: 'project-ready',
        title: 'Project Setup Complete',
        platform: 'godot',
        type: 'info',
        content: 'Your team project is now downloaded and ready for development!',
        details: 'You can start coding, making commits, and collaborating with your team.',
        isComplete: true
      }
    ];

    // Build workflow based on chosen authentication method
    let workflow = [...baseSteps];
    
    if (simulationState.authMethod === 'personal-token') {
      workflow = [...workflow, ...personalTokenSteps, ...finalSteps];
    } else if (simulationState.authMethod === 'github-cli') {
      workflow = [...workflow, ...githubCliSteps, ...finalSteps];
    } else {
      // Before choice is made, just show base steps
      workflow = baseSteps;
    }

    return workflow;
  };

  const teacherWorkflow = [
    {
      id: 'navigate-master',
      title: 'Navigate to Master Repository',
      platform: 'github',
      type: 'info',
      content: 'Go to endless-studios/ep-godot-project repository on GitHub.'
    },
    {
      id: 'fork-repository',
      title: 'Fork for First Team',
      platform: 'github',
      type: 'info',
      content: 'Click "Fork" button → Select your teacher account → Change name to "team-alpha-godot-project" → Set visibility to "Private" → Click "Create fork".'
    },
    {
      id: 'repeat-forks',
      title: 'Create Additional Team Forks',
      platform: 'github',
      type: 'info',
      content: 'Return to original repository and repeat forking process for each team: team-beta-godot-project, team-gamma-godot-project, etc.'
    },
    {
      id: 'invite-members',
      title: 'Invite Team Members',
      platform: 'github',
      type: 'info',
      content: 'For each team repository: Settings → Manage access → Invite a collaborator → Enter username → Set "Write" permissions → Add to repository.',
      details: 'Repeat for all team members. Each student receives an email invitation.'
    },
    {
      id: 'send-links',
      title: 'Send Repository Links',
      platform: 'email',
      type: 'info',
      content: 'Email each team their specific repository link for easy access.',
      isComplete: true
    }
  ];

  const getCurrentWorkflow = () => {
    return selectedRole === 'student' ? getStudentWorkflow() : teacherWorkflow;
  };

  const advanceToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleChoice = (choiceId) => {
    const newState = { ...simulationState };
    
    if (choiceId === 'personal-token' || choiceId === 'github-cli') {
      newState.authMethod = choiceId;
    }
    
    setSimulationState(newState);
    
    // Advance to next step - the workflow will rebuild with the correct path
    setTimeout(() => {
      setCurrentStep(currentStep + 1);
    }, 500);
  };

  const renderRoleSelection = () => (
    <div className="text-center space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Choose Your Role</h2>
      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <button
          onClick={() => {
            setSelectedRole('student');
            setCurrentStep(0);
            setSimulationState({});
          }}
          className="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
        >
          <Users className="w-12 h-12 mx-auto text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800">Student</h3>
          <p className="text-gray-600 mt-2">Complete workflow: Account → Platform → Bundle → Project</p>
        </button>
        <button
          onClick={() => {
            setSelectedRole('teacher');
            setCurrentStep(0);
            setSimulationState({});
          }}
          className="p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all"
        >
          <GitBranch className="w-12 h-12 mx-auto text-green-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800">Teacher</h3>
          <p className="text-gray-600 mt-2">Repository management and team setup</p>
        </button>
      </div>
    </div>
  );

  const renderSimulation = () => {
    const workflow = getCurrentWorkflow();
    const currentStepData = workflow[currentStep];
    
    if (!currentStepData) return null;

    const isComplete = currentStepData.isComplete;
    const progress = ((currentStep + 1) / workflow.length) * 100;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            {selectedRole === 'student' ? 'Student' : 'Teacher'} Workflow
          </h2>
          <button
            onClick={() => setSelectedRole('')}
            className="text-blue-600 hover:text-blue-800"
          >
            ← Change Role
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-sm text-gray-600 text-center">
          Step {currentStep + 1} of {workflow.length}
          {isComplete && <span className="text-green-600 ml-2">✓ Complete!</span>}
        </div>

        {/* Current Step */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <PlatformBadge platform={currentStepData.platform} />
            <h3 className="text-xl font-semibold text-gray-800">{currentStepData.title}</h3>
          </div>
          
          <p className="text-gray-600 mb-4">{currentStepData.content}</p>

          {currentStepData.details && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-blue-800 text-sm">{currentStepData.details}</p>
            </div>
          )}

          {currentStepData.warning && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <div className="flex">
                <AlertTriangle size={16} className="text-red-600 mr-2 mt-0.5" />
                <p className="text-red-800 text-sm font-medium">{currentStepData.warning}</p>
              </div>
            </div>
          )}

          {currentStepData.frictionPoints && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
              <p className="font-medium text-yellow-800 mb-2">Potential Issues:</p>
              <ul className="text-sm text-yellow-700 space-y-1">
                {currentStepData.frictionPoints.map((point, i) => (
                  <li key={i}>• {point}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Choice Buttons */}
          {currentStepData.type === 'choice' && (
            <div className="grid gap-3 mt-4">
              {currentStepData.choices.map((choice) => {
                const Icon = choice.icon;
                return (
                  <button
                    key={choice.id}
                    onClick={() => handleChoice(choice.id)}
                    className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-500 text-left transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Icon size={20} className="text-blue-600" />
                      <span className="font-medium text-gray-800">{choice.title}</span>
                      <ArrowRight size={16} className="text-gray-400 ml-auto" />
                    </div>
                    <p className="text-sm text-gray-600">{choice.description}</p>
                  </button>
                );
              })}
            </div>
          )}

          {/* Manual Navigation for Non-Choice Steps */}
          {currentStepData.type !== 'choice' && !isComplete && (
            <div className="flex justify-end mt-6">
              <button
                onClick={advanceToNextStep}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Next →
              </button>
            </div>
          )}

          {isComplete && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setSelectedRole('')}
                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Start New Simulation
              </button>
            </div>
          )}
        </div>

        {/* State Display */}
        {Object.keys(simulationState).length > 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-2">Current State:</h4>
            <div className="space-y-1 text-sm">
              {simulationState.authMethod && (
                <div className="text-blue-600">
                  ✓ Authentication Method: {simulationState.authMethod === 'personal-token' ? 'Personal Access Token' : 'GitHub CLI'}
                </div>
              )}
              <div className="text-gray-600">
                Total Steps in Current Path: {workflow.length}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Explorer Program GitHub Workflow Simulator
        </h1>
        
        {!selectedRole && renderRoleSelection()}
        {selectedRole && renderSimulation()}
      </div>
    </div>
  );
};

export default GitHubWorkflowSimulator;