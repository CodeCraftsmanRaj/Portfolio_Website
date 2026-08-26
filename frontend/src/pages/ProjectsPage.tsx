import React, { useState } from 'react'
import { OsMode, projectsList } from '../data/portfolioData'
import { WindowCard } from '../components/WindowCard'

interface ProjectsPageProps {
  mode: OsMode
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ mode }) => {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProjects = projectsList.filter((p) => {
    const q = searchQuery.toLowerCase()
    return (
      p.title.toLowerCase().includes(q) ||
      p.filename.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    )
  })

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Page Header */}
      <div className="projects-page-header">
        <div className="projects-header-info">
          <h1>Projects</h1>
          <p>/root/workspace/repositories — Displaying {filteredProjects.length} entries.</p>
        </div>

        <div className="projects-search-bar">
          <span className="material-symbols-outlined muted-text" style={{ fontSize: 18 }}>search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Grep projects (e.g. 'rust', 'c', 'python')..."
          />
        </div>
      </div>

      <WindowCard mode={mode} activeView="projects" title="/root/workspace/repositories">
        <div style={{ padding: '36px 40px' }}>
          <div className="projects-bento-grid">
            {filteredProjects.map((project) => {
              // 1. Featured card (col-span 8)
              if (project.id === 'dist-engine') {
                return (
                  <div
                    key={project.id}
                    className="project-card featured-card group"
                  >
                    <div className="project-card-header">
                      <div className="filename">
                        <span className="material-symbols-outlined crimson-text" style={{ fontSize: 16 }}>
                          insert_drive_file
                        </span>
                        <span>{project.filename}</span>
                      </div>
                      {project.lastModified && (
                        <span className="tag-badge highlight-tag">
                          Last modified: {project.lastModified}
                        </span>
                      )}
                    </div>

                    <div className="project-card-body">
                      <h2>{project.title}</h2>
                      <p>{project.description}</p>
                      <div className="project-tags-row">
                        {project.tags.map((tag, idx) => (
                          <span
                            key={tag}
                            className={`tag-badge ${idx === 0 ? 'active-tag' : ''}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              }

              // 2. Code preview card (col-span 8)
              if (project.codeSnippet) {
                return (
                  <div
                    key={project.id}
                    className="project-card code-card group"
                  >
                    <div className="project-code-snippet">
                      <div className="filename" style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span className="material-symbols-outlined crimson-text" style={{ fontSize: 14 }}>
                          terminal
                        </span>
                        <span>{project.filename}</span>
                      </div>
                      <pre style={{ margin: 0, fontFamily: 'inherit', fontSize: '11px', lineHeight: 1.6 }}>
                        {project.codeSnippet}
                      </pre>
                    </div>

                    <div className="project-card-body">
                      <h2>{project.title}</h2>
                      <p>{project.description}</p>
                      <div className="project-tags-row">
                        {project.tags.map((tag, idx) => (
                          <span
                            key={tag}
                            className={`tag-badge ${idx === 0 ? 'active-tag' : ''}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              }

              // 3. Render Screen preview card (col-span 4)
              if (project.hasRenderPreview) {
                return (
                  <div
                    key={project.id}
                    className="project-card preview-card group"
                  >
                    <div className="project-card-header">
                      <div className="filename">
                        <span className="material-symbols-outlined crimson-text" style={{ fontSize: 16 }}>
                          image
                        </span>
                        <span>{project.filename}</span>
                      </div>
                    </div>

                    <div className="project-render-screen">
                      <span>[Render Output]</span>
                    </div>

                    <div className="project-card-body">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="project-tags-row">
                        {project.tags.map((tag, idx) => (
                          <span
                            key={tag}
                            className={`tag-badge ${idx === 0 ? 'active-tag' : ''}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              }

              // 4. Standard card (col-span 4)
              return (
                <div
                  key={project.id}
                  className="project-card standard-card group"
                >
                  <div className="project-card-header">
                    <div className="filename">
                      <span className="material-symbols-outlined crimson-text" style={{ fontSize: 16 }}>
                        insert_drive_file
                      </span>
                      <span>{project.filename}</span>
                    </div>
                  </div>

                  <div className="project-card-body">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-tags-row">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={tag}
                          className={`tag-badge ${idx === 0 ? 'active-tag' : ''}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </WindowCard>
    </div>
  )
}
