import com.example.gramofer.model.Edition;
import com.example.gramofer.model.UserAccount;
import com.example.gramofer.model.Vinyl;
import com.example.gramofer.repo.UserRepo;
import com.example.gramofer.repo.VinylRepo;
import com.example.gramofer.responses.VinylResponseDTO;
import com.example.gramofer.service.UserService;
import com.example.gramofer.service.VinylService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import java.util.Arrays;
import java.util.List;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TestClass {

    @Mock
    private VinylRepo repoVinyl;

    @Mock
    private UserRepo userRepo;


    @InjectMocks
    private UserService userService;

    @InjectMocks
    private VinylService vinylService;

    @Test
    public void testFetchVinyls() {
        Vinyl vinyl1 = new Vinyl();
        vinyl1.setVinylId(1);
        Vinyl vinyl2 = new Vinyl();
        vinyl2.setVinylId(2);

        when(repoVinyl.findAll()).thenReturn(Arrays.asList(vinyl1, vinyl2));

        List<Vinyl> vinyls = vinylService.fetchVinyls();
        assertThat(vinyls).hasSize(2);
        assertThat(vinyls.get(0).getVinylId()).isEqualTo(1);
        assertThat(vinyls.get(1).getVinylId()).isEqualTo(2);
    }

    @Test
    public void testFetchVinylsEmpty() {
        when(repoVinyl.findAll()).thenReturn(Arrays.asList());

        List<Vinyl> vinyls = vinylService.fetchVinyls();
        assertThat(vinyls).isEmpty();
    }

    @Test
    public void testFetchVinylsException() {
        when(repoVinyl.findAll()).thenThrow(new RuntimeException("Database error"));

        assertThatThrownBy(() -> vinylService.fetchVinyls())
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Database error");
    }

    @Test
    public void testGetVinylByUser() {

        UserAccount user = new UserAccount();
        Vinyl vinyl1 = new Vinyl();
        vinyl1.setVinylId(1);
        vinyl1.setVinylCondition("Mint");
        vinyl1.setCoverCondition("Near Mint");
        vinyl1.setDescription("Great album");
        vinyl1.setVinylImagePath1("path1");
        vinyl1.setVinylImagePath2("path2");
        vinyl1.setCoverImagePath1("coverPath1");
        vinyl1.setCoverImagePath2("coverPath2");
        vinyl1.setAvailable(1);
        vinyl1.setOnLocation("Shelf");
        vinyl1.setEditionLabel(new Edition()); // Pretpostavljamo da je ovo validan objekat

        Vinyl vinyl2 = new Vinyl();
        vinyl2.setVinylId(2);
        vinyl2.setVinylCondition("Excellent");
        vinyl2.setCoverCondition("Good");
        vinyl2.setDescription("Another great album");
        vinyl2.setVinylImagePath1("path3");
        vinyl2.setVinylImagePath2("path4");
        vinyl2.setCoverImagePath1("coverPath3");
        vinyl2.setCoverImagePath2("coverPath4");
        vinyl2.setAvailable(0);
        vinyl2.setOnLocation("Storage");
        vinyl2.setEditionLabel(new Edition());


        when(repoVinyl.findByUser(user)).thenReturn(Arrays.asList(vinyl1, vinyl2));


        List<VinylResponseDTO> result = vinylService.getVinylByUser(user);

        assertThat(result).hasSize(2);
        assertThat(result.get(0).getVinylId()).isEqualTo(1);
        assertThat(result.get(1).getVinylId()).isEqualTo(2);
        assertThat(result.get(0).getVinylCondition()).isEqualTo("Mint");
        assertThat(result.get(1).getVinylCondition()).isEqualTo("Excellent");
    }


    @Test
    public void testDeleteUserById_UserNotFound() {
        Integer userId = 2;

        ResponseEntity<?> response = userService.deleteUserById(userId);

        assertThat(response.getStatusCodeValue()).isEqualTo(404);
        assertThat(response.getBody()).isEqualTo("User not found");

        verify(userRepo, times(0)).deleteById(userId);
    }

    @Test
    public void testDeleteUserById_UserExists() {
        Integer userId = 1;
        UserAccount user = new UserAccount();
        user.setUserId(userId);
        ResponseEntity<?> response = userService.deleteUserById(userId);
        assertThat(response.getBody()).isEqualTo("User not found");
    }


}
