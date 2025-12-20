import './ProjectCard.css';

function ProjectCard({ project }) {
  const { title, description, tasks } = project;
  
  // Calculate progress locally for display
  const totalTasks = tasks ? tasks.length : 0;
  const completedTasks = tasks ? tasks.filter(t => t.isCompleted).length : 0;
  
  return (
    <div className="project-card">
      <h3 className="project-title">{title}</h3>
      <p className="project-desc">{description || "No description provided."}</p>
      
      <div className="project-progress">
        <span className="task-count">
          {completedTasks}/{totalTasks} tasks completed
        </span>
        <div className="progress-bar-bg">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
          ></div>
        </div>
      </div>
      
      <button className="view-details-btn">View Details</button>
    </div>
  );
}

export default ProjectCard;
