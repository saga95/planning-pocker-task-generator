import "./App.css";
import readXlsxFile from "read-excel-file";
import { useEffect, useState } from "react";
// import { CopyToClipboard } from "react-copy-to-clipboard";

function App() {
  const [file, setFile] = useState();
  const [rows, setRows] = useState([]);
  const [companyId, setCompanyId] = useState();
  const [success, setSuccess] = useState();

  const onChange = (event) => {
    setFile(event.nativeEvent.target.files[0]);
  };

  async function read(file) {
    readXlsxFile(file)
      .then((rows) => {
        setSuccess(true);
        setRows(rows);
      })
      .catch((error) => {
        setSuccess(false);
        setFile(false);
        console.log(error);
      });
  }

  const generateJSX = () => {
    return (
      companyId &&
      rows.length > 0 &&
      rows.map((row, index) => {
        let projectName = row[1].substring(0, 2);
        return (
          <div key={index}>
            {`<a href='https://${companyId}.atlassian.net/jira/software/projects/${projectName}/boards/1/backlog?selectedIssue=${
              row[1]
            }'>
      ${row[1]}</a>
      | Summary: ${row[2]} | 
      Type: ${row[0]} | 
      Reported By ${row[3]} | 
      Status: ${row[5]} | 
      Priority: ${row[4]}
      Description: ${`${row[6]}`} ||
      `}
          </div>
        );
      })
    );
  };

  useEffect(() => {
    read(file);
  }, [file]);

  return (
    <div className="wrapper">
      <div className="app">
        <h1 className="heading">Free Form Tasks Generator🔨</h1>
          <h2 className="heading">Add your JIRA tickets to Planning Pocker</h2>
          <small className="slogan">Just wanted to make scrum life easier 😋</small>
        <div>
          <h3>Steps</h3>
          <ol>
            <li>Export csv file from JIRA</li>
            <ul>
              Columns required for excell sheet
              <div>
                <small>
                  *You can select below filters before exporting the document
                  from JIRA
                </small>
              </div>
              <li>1st column: Issue Type</li>
              <li>2nd column: Issue Key</li>
              <li>3rd column: Summary</li>
              <li>4th column: Reporter</li>
              <li>5th column: Priority</li>
              <li>6th column: Status</li>
              <li>7th column: Description</li>
            </ul>
            <li>Convert it to xlsx</li>
            <div>
              <small>
                *You can upload it gdrive and convert it or use online
                converters if you do not have excell. Find my preffered one{" "}
                <a href="https://smallpdf.com/blog/convert-xls-to-xlsx">here</a>
              </small>
            </div>
            <li>
              Input your company handler. You can find it on JIRA board url
            </li>
            <small>
              *Eg:
              https://"here-you-can-find-the-company-handler".atlassian.net/jira/software/projects/EG/boards/
            </small>
            <div>
              <input
                onChange={(event) => setCompanyId(event.target.value)}
                placeholder="Company handler"
              />
            </div>
            <li>Upload .xlsx file</li>
            <small>*Not support for other file types</small>
            <div>
              <input
                className="input"
                type="file"
                id="input"
                onChange={onChange}
                accept=".xlsx"
              />
            </div>
          </ol>
        </div>
        <div className="text">
          <div>
            {companyId && success ? (
              <h4>
                Copy and paste below text on FREEFORM INPUT in Planning Pocker!
              </h4>
            ) : (
              ""
            )}
          </div>
          <div>{!companyId && success && <h4>Add company handler!</h4>}</div>
          {success ? generateJSX() : null}
        </div>
      </div>
      <footer className="footer">
        {`<`}
        <a className="author" href="http://sagara.me/">
          sagara 🕶
        </a>
        {`/>`}
      </footer>
    </div>
  );
}

export default App;
