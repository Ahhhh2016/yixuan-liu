## Mesh (final submission)

Please fill this out and submit your work to Gradescope by the deadline.

### Output Comparison

Run the program with the specified `.ini` config file to compare your output against the reference images. The program should automatically save the output mesh to the `student_outputs/final` folder. Please take a screenshot of the output mesh and place the image in the table below. Do so by placing the screenshot `.png` in the `student_outputs/final` folder and inserting the path in the table.

- For instance, after running the program with the `subdivide_icosahedron_4.ini` config file, go to and open `student_outputs/final/subdivide_icosahedron_4.obj`. Take a screenshot of the mesh and place the screenshot in the first row of the first table in the column titled `Your Output`.
- The markdown for the row should look something like `| subdivide_icosahedron_4.ini |  ![](ground_truth_pngs/final/subdivide_icosahedron_4.png) | ![](student_outputs/final/subdivide_icosahedron_4.png) |`

If you are not using the Qt framework, you may also produce your outputs otherwise so long as the output images show up in the table. In this case, please also describe how your code can be run to reproduce your outputs.

> Qt Creator users: If your program can't find certain files or you aren't seeing your output images appear, make sure to:<br/>
>
> 1. Set your working directory to the project directory
> 2. Set the command-line argument in Qt Creator to `template_inis/final/<ini_file_name>.ini`

Note that your outputs do **not** need to exactly match the reference outputs. There are several factors that may result in minor differences, especially for certain methods like simplification where equal-cost edges may be handled differently.

Please do not attempt to duplicate the given reference images; we have tools to detect this.

| `.ini` File To Produce Output |                     Expected Output                      |                                   Your Output                                   |
| :---------------------------: | :------------------------------------------------------: | :-----------------------------------------------------------------------------: |
|  subdivide_icosahedron_4.ini  | ![](ground_truth_pngs/final/subdivide_icosahedron_4.png) |<img width="2068" height="1272" alt="image" src="https://github.com/user-attachments/assets/148228bb-65ae-4141-a6c5-d27dfd1305d9" />
 |
|   simplify_sphere_full.ini    |  ![](ground_truth_pngs/final/simplify_sphere_full.png)   |<img width="2062" height="1275" alt="image" src="https://github.com/user-attachments/assets/99d9188a-62cc-4cc1-bf0b-c47ead838948" />
   |
|       simplify_cow.ini        |      ![](ground_truth_pngs/final/simplify_cow.png)       | <img width="2065" height="1273" alt="image" src="https://github.com/user-attachments/assets/2c5dd4e8-3588-4c29-b12e-1b5df1f51784" />
   |

Output for Isotropic Remeshing (Note: if you did not implement this you can just skip this part)
| `.ini` File To Produce Output | Input Mesh .png | Remeshed Mesh .png |
| :---------------------------------------: | :--------------------------------------------------: | :-------------------------------------------------: |
| testRemesh.ini | <img width="2062" height="1266" alt="image" src="https://github.com/user-attachments/assets/ace4a1e4-cc86-45cd-a884-8a1f386e24d3" />
 |<img width="2066" height="1267" alt="image" src="https://github.com/user-attachments/assets/2bafb695-d0f2-4f74-8f75-a34146c5bb30" />
 |
 | testRemesh.ini | <img width="2073" height="1276" alt="image" src="https://github.com/user-attachments/assets/38dbf47d-5e6c-4bf1-a2be-f25e661399de" />
 |<img width="2065" height="1266" alt="image" src="https://github.com/user-attachments/assets/103040a7-2c78-43dc-9109-eb1263d94ffd" />
 |

Output for Bilateral Mesh Denoising (Note: if you did not implement this you can just skip this part)
| `.ini` File To Produce Output | Noisy Mesh .png | Denoised Mesh .png |
| :---------------------------------------: | :--------------------------------------------------: | :-------------------------------------------------: |
|denoise.ini |<img width="819" height="669" alt="image" src="https://github.com/user-attachments/assets/92e47519-ed06-42ff-8d78-175344e04637" />
 | <img width="819" height="656" alt="image" src="https://github.com/user-attachments/assets/e52b1721-8f9b-4865-a515-5638d5e53f4a" />
|
| denoise.ini  | <img width="1535" height="1019" alt="image" src="https://github.com/user-attachments/assets/4247509c-9ee0-403e-b6cc-8960651d8cd2" />
 |<img width="1635" height="1039" alt="image" src="https://github.com/user-attachments/assets/0cf2c8cb-5f03-426d-b2f8-161c00932317" />
 |

Output for any other Geometry Processing Functions (Note: if you did not implement this you can just skip this part)
| `.ini` File To Produce Output | Input | Output |
| :---------------------------------------: | :--------------------------------------------------: | :-------------------------------------------------: |
| <Path to your .ini file> | ![Place screenshot input mesh here]() | ![Place screenshot of output mesh here]() |

### Implementation Locations

Please list the lines where the implementations of these features start:

- [Mesh data structure & validator](https://github.com/brown-cs-224/mesh-Ahhhh2016-1/blob/edff2cd7a3b4925caf25c8d264eab23dde825c62/mesh.h#L35)
- [Loop Subdivision](https://github.com/brown-cs-224/mesh-Ahhhh2016-1/blob/edff2cd7a3b4925caf25c8d264eab23dde825c62/subdivision.cpp#L6)
- [Quadric Error Simplification](https://github.com/brown-cs-224/mesh-Ahhhh2016-1/blob/edff2cd7a3b4925caf25c8d264eab23dde825c62/QEM.cpp#L60)
- [Isotropic remeshing](https://github.com/brown-cs-224/mesh-Ahhhh2016-1/blob/edff2cd7a3b4925caf25c8d264eab23dde825c62/remesh.cpp#L16)
- [Noise / denoise](https://github.com/brown-cs-224/mesh-Ahhhh2016-1/blob/edff2cd7a3b4925caf25c8d264eab23dde825c62/denoise.cpp#L10)

### Design Choices

#### Mesh Data Structure

Describe your mesh data structure here.

I use a half-edge mesh representation which includes:
- Vertex: stores a unique `index`, `degree`, 3D position `pos`, and a pointer `halfedge` to one outgoing halfedge.
- Face: stores a unique `index` and a pointer `halfedge` to one halfedge on the face.
- Halfedge: directed edge from `from` → `to`, with pointers `next` (next halfedge around the face), `twin` (opposite direction halfedge), and back-pointers to its incident `face` and undirected `edge`.
- Edge: undirected edge record that has one pointer to its `halfedge` and flag `isNew` used by subdivision/remeshing.

For efficient traversal and updates, I store pointers to these elements in maps:
- `V`: `vertex_id -> Vertex*`
- `F`: `face_id -> Face*`
- `HE`: halfedge map keyed by `(from_id, to_id)` to find the halfedge quickly
- `E`: undirected edge map keyed by `(min(v0,v1), max(v0,v1))`.

#### Mesh Validator

Describe what your mesh validator checks for here. This can be a list.

1. Assert that each vertex has a halfedge
2. Verify that there are no isolated vertices
3. Verify disk-like topology around vertices
4. Check halfedges have valid twins
5. Check halfedges have valid next pointers
6. Ensure the twin points back to the original halfedge
7. Check each edge belongs to exactly two faces
8. Check every halfedge has exactly one twin
9. Assert that each face has a halfedge
10. Check if each halfedge is only counted once
11. Validate undirected Edge container E is consistent with HE

#### Run Time/Efficency

Describe how you achieved efficient asymptotic running times for your geometry processing functions, including the data structures you used.

##### Hash Tables

I use hash tables for constant-time queries:

  - `HE : unordered_map<(from,to), Halfedge*>` gives average $O(1)$ access to the halfedge between two vertices.
  - `E : unordered_map<(min,max), Edge*>` also givees average $O(1)$ lookup. It is used in QEM simplification.

##### Atomic operations

flipEdge, splitEdge:  $O(1)$
collapseEdge: if we assume one vertex has constant number of neighbors, the time complicity should also be $O(1)$.

##### Loop subdivision 

Let the number of vertices be $n$ and number of edges be $m$.

  - set current vertices to old: $O(n)$
  - Precompute new positions for old vertices by one-ring traversal: $O(m)$
  - Compute positions for new points on edges: $O(m)$
  - Perform splits by iterating a snapshot of old edge keys: $O(m)$
  - Edge flips iterate over a snapshot of edges: $O(m)$

Overall, the time complixity is $O(n+m)$

##### Quadric Error Metric simplification

  - Compute Q matrix for each face planes: $O(|F|)$
  - Priority structure: I used a balanced BST `set<Candidate> QEMQueue` as the min-queue, so build time is $O(|E|\log |E|)$, find smallest is $O(\log |E|)$.
  - I use `unordered_map<EKey, set<Candidate, CandidateLess>::iterator, PairHash> CandidateFinder;` for fast updates with $O(1)$ hash lookup. The tree update is $O(\log |E|)$.

### Extra Features

##### Isotropic remeshing

##### Noise / denoise
  - `denoise`: with `rho <= 0` it uses only 1-ring neighbors. With `rho > 0` it performs a BFS over connectivity.

### Collaboration/References

### Known Bugs
