import { useEffect, useState } from "react";
import { cluster } from "../requests/clusters";

const addFilmToCluster = async (clusterId, film) => {
  await cluster.add(clusterId, film);
};

const toggleAdder = () => {
  document
    .querySelector("#cluster-adder-container")
    .classList.toggle("adder-closed");
};

const addCluster = async (email, title, film) => {
  let insertedId = await cluster.new(email, title);
  await cluster.add(insertedId, film);
};

const openClusterAdder = () => {
  document.querySelector("#new-cluster-modal").classList.remove("modal-closed");
};

const closeClusterAdder = () => {
  document.querySelector("#new-cluster-modal").classList.add("modal-closed");
};

function AddToCluster(props) {
  const [userClusters, setUserClusters] = useState();

  useEffect(() => {
    const getUserClusters = async (email) => {
      setUserClusters(await cluster.find(email));
    };
    if (!userClusters) {
      getUserClusters(props.userEmail);
    }
  });

  // if (!userClusters) {
  //   return <Loading />;
  // }

  return (
    <div>
      <button
        onClick={() => {
          toggleAdder();
        }}
        className="add-to-button action-button"
      >
        Add to Cluster
      </button>
      <div id="cluster-adder-container" className="adder-closed">
        <ul>
          {userClusters
            ? userClusters.map((cluster) => {
                return (
                  <li
                    key={cluster.title}
                    onClick={() => {
                      addFilmToCluster(cluster._id, props.film);
                      toggleAdder();
                    }}
                  >
                    {cluster.title}
                  </li>
                );
              })
            : null}
          <li
            onClick={() => {
              openClusterAdder();
            }}
          >
            New Cluster
          </li>
        </ul>
      </div>
      <div id="new-cluster-modal" className="modal-closed">
        <div>
          Title: <input id="new-cluster-title" type="text" />
        </div>
        <div>
          <button
            onClick={() => {
              addCluster(
                props.userEmail,
                document.querySelector("#new-cluster-title").value,
                props.film
              );
              closeClusterAdder();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddToCluster;
